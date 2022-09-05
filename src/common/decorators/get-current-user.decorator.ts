import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    console.log('user', request);
    if (!data) return request.user;
    return request.user[data];
  },
);
//TODO user не подхватывает при logout FIX!!!
