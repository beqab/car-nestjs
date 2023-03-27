import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUserDecorator = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    console.log(request.session.userId, "request.session.userID");
    return request.currentUser;
  },
);
