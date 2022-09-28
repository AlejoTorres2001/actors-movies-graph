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
    if (context.getType() === 'http') {
      const ctx = context.switchToHttp();
      const { method, url, connection } = ctx.getRequest();
      const { statusCode } = ctx.getResponse();
      const now = Date.now();
      const data = `${method} ${url} ${connection.remoteAddress} ${now} - ${statusCode}`;
      return next.handle().pipe(
        tap(() => {
          console.log(data);
        }),
      );
    }
    return next.handle();
  }
}
