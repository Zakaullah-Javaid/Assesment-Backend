import { Role } from 'src/role/entities/role.entity';
import { Task } from 'src/task/entities/task.entity';
export declare class User {
    id: number;
    name?: string;
    email: string;
    password: string;
    validated: boolean;
    invitationToken: string;
    adminId: number;
    role: Role;
    tasks: Task[];
}
