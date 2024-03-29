import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
export declare class TokenAuthGuard implements CanActivate {
    private userService;
    constructor(userService: UserService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
