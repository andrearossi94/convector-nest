// tslint:disable-next-line:no-var-requires
import { envVariables as envVariablesCommon } from '@convector-sample/common';
import { Logger } from '@nestjs/common';

export const envVariables: any = {
  // fusione common envVariables
  ...envVariablesCommon,

  // extend common envVariables
  // http/s server
  httpPort: process.env.HTTP_SERVER_PORT || 3000,
  httpsPort: process.env.HTTPS_SERVER_PORT || 8443,
  
  // swaggerModule
  swaggerModuleTitle: process.env.SWAGGER_MODULE_TITLE || 'Cartellaclinica ChainCode',
  swaggerModuleDescription: process.env.SWAGGER_MODULE_DESCRIPTION || 'Convector Cartellaclinica chaincode API',
  swaggerModuleVersion: process.env.SWAGGER_MODULE_VERSION || '1.0',
  swaggerApiPath: process.env.SWAGGER_API_PATH || 'api',
  swaggerModuleTagAuth: process.env.SWAGGER_MODULE_TAG_AUTH || 'auth',
  swaggerModuleTagCartellaclinica: process.env.SWAGGER_MODULE_TAG_CARTELLACLINICA || 'cartellaclinica',
  swaggerModuleTagPersonale: process.env.SWAGGER_MODULE_TAG_PERSONALE || 'personale',

  // authService : true: moked users array, false: or ledger person(users) authentication
  authServiceUseMokedUsers: process.env.AUTH_SERVICE_USE_MOKED_USERS || true,

  // jwt
  
  accessTokenJwtSecret: process.env.ACCESS_TOKEN_JWT_SECRET || 'secretKeyAccessToken',
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
  refreshTokenJwtSecret: process.env.REFRESH_TOKEN_JWT_SECRET || 'secretKeyRefreshToken',
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
};
