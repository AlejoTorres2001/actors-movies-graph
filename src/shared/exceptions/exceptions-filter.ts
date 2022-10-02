import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { GraphQLError } from 'graphql';
import { Repository } from 'typeorm';
import { ApiLog } from '../entities/api-log.entity';
import { Exception } from '../entities/exception.entity';
@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(
    @InjectRepository(Exception)
    private readonly exceptionRepository: Repository<Exception>,
    @InjectRepository(ApiLog)
    private readonly apiLogRepository: Repository<ApiLog>,
  ) {
    super();
  }
  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      const start = Date.now();
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const status = exception.getStatus();
      const message = exception.message;
      const name = exception.name;
      response.status(status).json({
        statusCode: status,
        message,
      });
      this.apiLogRepository
        .save({
          method: request.method,
          url: request.url,
          hostName: request.hostname,
          ip: request.socket.remoteAddress,
          statusCode: status,
          exceptionMessage: message,
          exceptionName: name,
          reqTransportLayerProtocol: request.protocol,
          reqBody: JSON.stringify(request.body),
          reqQuery: JSON.stringify(request.query),
          date: new Date(),
          throughputTime: Date.now() - start,
        })
        .catch((err) => {
          throw err;
        });
      return;
    }
    if (exception instanceof GraphQLError) {
      const { name, message, stack } = exception;
      this.exceptionRepository
        .save({
          message,
          name,
          stack,
          date: new Date(),
        })
        .catch((err) => {
          throw err;
        });
      return {};
    }

    if (exception instanceof Error) {
      const { name, message, stack } = exception;
      this.exceptionRepository
        .save({
          message,
          name,
          stack,
          date: new Date(),
        })
        .catch((err) => {
          throw err;
        });
      return super.catch(exception, host);
    }
  }
}
