import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UnauthorizedException,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TokenAuthGuard } from 'src/guard/auth.guard';
import { Task, TaskStatus } from './entities/task.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Task')
@Controller('tasks')
@ApiBearerAuth()
@UseGuards(TokenAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({
    status: 201,
    description: 'Task created successfully',
    type: Task,
  })
  @UseGuards(TokenAuthGuard)
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Req() req) {
    try {
      const user = req.user;
      console.log(user, 'user');
      return this.taskService.create(createTaskDto, user);
    } catch (error) {
      throw new UnauthorizedException('Invalid user');
    }
  }

  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    description: 'Retrieved all tasks successfully',
    type: [Task],
  })
  @UseGuards(TokenAuthGuard)
  @Get()
  async findAll(
    @Req() req,
    @Query('fetchUsers') fetchUsers: boolean,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('status') status: TaskStatus,
  ) {
    try {
      const user = req.user;
      return await this.taskService.findAll(
        user,
        fetchUsers,
        page,
        limit,
        status,
      );
    } catch (error) {
      throw new UnauthorizedException('Invalid user');
    }
  }

  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiResponse({
    status: 200,
    description: 'Task Fetched successfully',
    type: Task,
  })
  @UseGuards(TokenAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    try {
      const user = req.user;
      return this.taskService.findOne(+id, user);
    } catch (error) {
      throw new UnauthorizedException('Invalid user');
    }
  }

  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully',
    type: Task,
  })
  @UseGuards(TokenAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req,
  ) {
    try {
      const user = req.user;
      return this.taskService.update(+id, updateTaskDto, user);
    } catch (error) {
      throw new UnauthorizedException('Invalid user');
    }
  }

  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiResponse({
    status: 200,
    description: 'Task deleted successfully',
    type: Task,
  })
  @UseGuards(TokenAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    try {
      const user = req.user;
      return this.taskService.remove(+id, user);
    } catch (error) {
      throw new UnauthorizedException('Invalid user');
    }
  }
}
