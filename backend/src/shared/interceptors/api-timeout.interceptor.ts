import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { catchError, Observable, timeout, TimeoutError } from 'rxjs';

@Injectable()
export class ApiTimeOutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(30000),
      catchError((error) => {
        if (error instanceof TimeoutError) {
          throw new RequestTimeoutException();
        }
        throw error;
      }),
    );
  }
}
