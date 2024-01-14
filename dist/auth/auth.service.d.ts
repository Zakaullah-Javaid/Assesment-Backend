import { UserService } from '../user/user.service';
export declare class AuthService {
    private readonly userService;
    constructor(userService: UserService);
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
}
