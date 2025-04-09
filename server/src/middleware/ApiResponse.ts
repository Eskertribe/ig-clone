import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
  constructor(
    private readonly key: string,
    private readonly type?: unknown,
  ) {}

  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (!this.type) {
          return { [this.key]: data };
        }

        if (!Array.isArray(data)) {
          return { [this.key]: applyFilter(data, this.type) };
        }

        return {
          [this.key]: data.map(applyFilter),
        };
      }),
    );
  }
}

function applyFilter(data, type) {
  return Object.keys(type ?? {}).reduce((acc, key) => {
    if (key in data) {
      acc[key] = data[key];
    }

    return acc;
  }, {});
}

export function ApiResponse(key: string, type?: unknown) {
  return applyDecorators(UseInterceptors(new ApiResponseInterceptor(key, type)));
}
