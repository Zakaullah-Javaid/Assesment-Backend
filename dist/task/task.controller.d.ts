import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './entities/task.entity';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    create(createTaskDto: CreateTaskDto, req: any): Promise<Task>;
    findAll(req: any, fetchUsers: boolean, page: number, limit: number, status: TaskStatus): Promise<Task[]>;
    findOne(id: string, req: any): Promise<Task>;
    update(id: string, updateTaskDto: UpdateTaskDto, req: any): Promise<Task>;
    remove(id: string, req: any): Promise<Task>;
}
