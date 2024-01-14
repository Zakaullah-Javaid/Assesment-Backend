import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './entities/task.entity';
import { User } from 'src/user/entities/user.entity';
export declare class TaskService {
    private readonly taskRepository;
    constructor(taskRepository: Repository<Task>);
    create(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
    findAll(user: User, fetchUsers: boolean | string, page?: number, limit?: number, status?: TaskStatus | null): Promise<Task[]>;
    findOne(id: number, user: User): Promise<Task>;
    update(id: number, updateTaskDto: UpdateTaskDto, user: User): Promise<Task>;
    remove(id: number, user: User): Promise<Task>;
}
