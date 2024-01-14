import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class CreateTaskDto {
  @ApiProperty({ example: 'Task Name', description: 'The name of the task' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Task Description',
    description: 'The description of the task',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    enum: TaskStatus,
    example: TaskStatus.PENDING,
    description: 'The status of the task (Pending or Completed)',
  })
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
