import { ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Repository } from 'typeorm';
import { ApiLog } from '../entities/api-log.entity';
import { Exception } from '../entities/exception.entity';
export declare class AllExceptionsFilter extends BaseExceptionFilter {
    private readonly exceptionRepository;
    private readonly apiLogRepository;
    constructor(exceptionRepository: Repository<Exception>, apiLogRepository: Repository<ApiLog>);
    catch(exception: unknown, host: ArgumentsHost): void | {};
}
