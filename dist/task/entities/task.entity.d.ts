import { User } from 'src/user/entities/user.entity';
export declare enum TaskStatus {
    PENDING = "Pending",
    COMPLETED = "Completed"
}
export declare class Task {
    id: number;
    name: string;
    description: string;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}
