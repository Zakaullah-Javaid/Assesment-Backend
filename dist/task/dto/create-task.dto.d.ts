import { TaskStatus } from '../entities/task.entity';
export declare class CreateTaskDto {
    name: string;
    description: string;
    status: TaskStatus;
}
