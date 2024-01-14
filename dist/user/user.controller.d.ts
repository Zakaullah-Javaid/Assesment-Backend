import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    sendInvite(req: any, email: string): Promise<string>;
    resendInvite(req: any, email: string): Promise<string>;
    setPassword(email: string, password: string, invitationToken: string): Promise<string>;
}
