export declare class CreateUserDto {
    name?: string;
    email: string;
    password: string;
    validated?: boolean;
    invitationToken?: string;
    adminId?: number;
    role: number;
}
