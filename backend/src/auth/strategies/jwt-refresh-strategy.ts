import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { JWTPayload } from '../interfaces/jwt-payload.interface';
import { Request } from 'express';

const cookieExtractor = (req: Request) => {
  let jwt: string = null;

  if (req && req.cookies) {
    jwt = req.cookies['refresh_token'];
  }

  return jwt;
};
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JWTPayload) {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) throw new ForbiddenException('Refresh token malformed');
    return { ...payload, refreshToken };
  }
}
