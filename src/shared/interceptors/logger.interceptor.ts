import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Scope,
  Inject,
} from '@nestjs/common';
import { CONTEXT, GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { ApiLog } from '../entities/api-log.entity';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @InjectRepository(ApiLog)
    private readonly ApiLogRepository: Repository<ApiLog>,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    if (context.getType() === 'http') {
      const ctx = context.switchToHttp();
      const { method, url, connection, body, query } = ctx.getRequest();
      const { statusCode } = ctx.getResponse();
      return next.handle().pipe(
        tap(() => {
          const end = Date.now();
          this.ApiLogRepository.save({
            method,
            url,
            ip: connection.remoteAddress,
            statusCode,
            reqTransportLayerProtocol: connection.encrypted ? 'https' : 'http',
            reqBody: JSON.stringify(body),
            reqQuery: JSON.stringify(query),
            throughputTime: end - start,
          }).catch((err) => {
            throw err;
          });
        }),
      );
    }

    if (context.getType<GqlContextType>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      const { req, res } = ctx.getContext();
      const { method, url, connection, body } = req;
      console.log(res);

      return next.handle().pipe(
        tap(() => {
          const end = Date.now();
          this.ApiLogRepository.save({
            method,
            url,
            ip: connection.remoteAddress,
            statusCode: 0,
            reqTransportLayerProtocol: 'graphql',
            reqBody: JSON.stringify({
              opName: body.operationName,
              variables: body.variables,
            }),
            reqQuery: JSON.stringify(body.query),
            throughputTime: end - start,
          }).catch((err) => {
            throw err;
          });
        }),
      );
    }
    return next.handle();
  }
}
