export declare class User {
    userId: string;
    email: string;
    password: string;
    hashPassword(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
}
