import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { method, url, connection } = context.switchToHttp().getRequest();
    const { statusCode } = context.switchToHttp().getResponse();
    const now = Date.now();
    const data = `${method} ${url} ${connection.remoteAddress} ${now} - ${statusCode}`;
    return next.handle().pipe(
      tap(() => {
        console.log(data);
      }),
    );
  }
}
