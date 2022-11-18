import { Strategy } from 'passport-jwt';
import { JWTPayload } from '../interfaces/jwt-payload.interface';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: JWTPayload): JWTPayload;
}
export {};
