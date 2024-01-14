import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';
export declare class UserService {
    private readonly userRepository;
    private readonly roleRepository;
    constructor(userRepository: Repository<User>, roleRepository: Repository<Role>);
    createAdminUser(): Promise<void>;
    sendInvite(email: string, user: User): Promise<string>;
    private generateInviteToken;
    resendInvite(email: string, user: User): Promise<string>;
    setNewPassword(email: string, password: string, invitationToken: string): Promise<string>;
    findByEmail(email: string): Promise<User>;
    findById(id: number): Promise<User>;
    isAdmin(id: number): Promise<boolean>;
}
