import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
  constructor(private readonly key: string) {}

  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return { [this.key]: data };
      }),
    );
  }
}

export function ApiResponse(key: string) {
  return applyDecorators(UseInterceptors(new ApiResponseInterceptor(key)));
}
