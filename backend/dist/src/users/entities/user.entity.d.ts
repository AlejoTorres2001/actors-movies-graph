export declare class User {
    id: string;
    email: string;
    username: string;
    password: string;
    hashPassword(): Promise<void>;
    hashedRefreshToken?: string;
    hashRefreshToken(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
    validateRefreshToken(refreshToken: string): Promise<boolean>;
}
