export interface JwtPayload {
  exp: number;
  iat: number;
  sub: string | number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  roles: string;
}
