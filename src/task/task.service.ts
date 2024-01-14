// task.service.ts
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './entities/task.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: User) {
    const newTask = this.taskRepository.create({
      ...createTaskDto,
      user,
    });
    await this.taskRepository.save(newTask);
    return newTask;
  }

  async findAll(
    user: User,
    fetchUsers: boolean | string,
    page: number = 1,
    limit: number = 10,
    status: TaskStatus | null = null,
  ) {
    try {
      let tasksQuery = this.taskRepository.createQueryBuilder('task');

      if (fetchUsers == true || (fetchUsers == 'true' && !user.adminId)) {
        tasksQuery = tasksQuery.leftJoinAndSelect('task.user', 'user');
        tasksQuery = tasksQuery.where('user.adminId = :adminId', {
          adminId: user.id,
        });
      } else {
        tasksQuery = tasksQuery.where('task.user = :userId', {
          userId: user.id,
        });
      }

      if (status !== null) {
        tasksQuery = tasksQuery.andWhere('task.status = :status', { status });
      }

      tasksQuery = tasksQuery.skip((page - 1) * limit).take(limit);

      const tasks = await tasksQuery.getMany();

      return tasks;
    } catch (error) {
      console.error('Error in findAll:', error);
      throw new UnauthorizedException('Invalid user');
    }
  }

  async findOne(id: number, user: User) {
    const task = await this.taskRepository.findOne({ where: { user, id } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, user: User) {
    const task = await this.taskRepository.findOne({ where: { user, id } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await this.taskRepository.update(id, updateTaskDto);
    const updatedTask = await this.taskRepository.findOne({ where: { id } });
    return updatedTask;
  }

  async remove(id: number, user: User) {
    const task = await this.taskRepository.findOne({ where: { user, id } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await this.taskRepository.remove(task);
    return task;
  }
}
