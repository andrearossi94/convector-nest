import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    // the req parameter will contain a user property
    // (populated by Passport during the passport-local authentication flow)
    // const authorization: string = (req.headers.authorization)
    //   ? req.headers.authorization
    //   : null;
    // if (authorization) {
    //   const token: string = authorization.toLowerCase().replace('bearer ', '');
    //   const validToken = this.jwtService.verify(token);
    // }
    return req;
  }
}
