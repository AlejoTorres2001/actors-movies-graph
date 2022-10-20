import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { ApiLog } from '../entities/api-log.entity';
export declare class LoggingInterceptor implements NestInterceptor {
    private readonly ApiLogRepository;
    constructor(ApiLogRepository: Repository<ApiLog>);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
