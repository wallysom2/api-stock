import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class FormatDateInterceptor implements NestInterceptor {
  private formatDate(date: Date): string {
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  private transformDates(data: any): any {
    if (data === null || data === undefined) {
      return data;
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.transformDates(item));
    }

    if (data instanceof Date) {
      return this.formatDate(data);
    }

    if (typeof data === 'object') {
      const transformed = {};
      for (const key in data) {
        if (key === 'createdAt' && data[key] instanceof Date) {
          transformed[key] = this.formatDate(data[key]);
        } else {
          transformed[key] = this.transformDates(data[key]);
        }
      }
      return transformed;
    }

    return data;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return this.transformDates(data);
      }),
    );
  }
}
