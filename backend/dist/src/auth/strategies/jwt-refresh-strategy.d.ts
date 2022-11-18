import { Strategy } from 'passport-jwt';
import { JWTPayload } from '../interfaces/jwt-payload.interface';
import { Request } from 'express';
declare const JwtRefreshStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    constructor();
    validate(req: Request, payload: JWTPayload): Promise<{
        refreshToken: any;
        userId: string;
    }>;
}
export {};
