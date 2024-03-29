"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./entities/task.entity");
let TaskService = class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async create(createTaskDto, user) {
        const newTask = this.taskRepository.create({
            ...createTaskDto,
            user,
        });
        await this.taskRepository.save(newTask);
        return newTask;
    }
    async findAll(user, fetchUsers, page = 1, limit = 10, status = null) {
        try {
            let tasksQuery = this.taskRepository.createQueryBuilder('task');
            if (fetchUsers == true || (fetchUsers == 'true' && !user.adminId)) {
                tasksQuery = tasksQuery.leftJoinAndSelect('task.user', 'user');
                tasksQuery = tasksQuery.where('user.adminId = :adminId', {
                    adminId: user.id,
                });
            }
            else {
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
        }
        catch (error) {
            console.error('Error in findAll:', error);
            throw new common_1.UnauthorizedException('Invalid user');
        }
    }
    async findOne(id, user) {
        const task = await this.taskRepository.findOne({ where: { user, id } });
        if (!task) {
            throw new common_1.NotFoundException('Task not found');
        }
        return task;
    }
    async update(id, updateTaskDto, user) {
        const task = await this.taskRepository.findOne({ where: { user, id } });
        if (!task) {
            throw new common_1.NotFoundException('Task not found');
        }
        await this.taskRepository.update(id, updateTaskDto);
        const updatedTask = await this.taskRepository.findOne({ where: { id } });
        return updatedTask;
    }
    async remove(id, user) {
        const task = await this.taskRepository.findOne({ where: { user, id } });
        if (!task) {
            throw new common_1.NotFoundException('Task not found');
        }
        await this.taskRepository.remove(task);
        return task;
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TaskService);
//# sourceMappingURL=task.service.js.map