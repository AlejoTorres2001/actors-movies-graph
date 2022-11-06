export declare class User {
    id: string;
    email: string;
    username: string;
    password: string;
    hashPassword(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
}
