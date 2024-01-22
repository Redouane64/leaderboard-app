import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): unknown => {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    return request.user;
  },
);
