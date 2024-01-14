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
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const task_service_1 = require("./task.service");
const create_task_dto_1 = require("./dto/create-task.dto");
const update_task_dto_1 = require("./dto/update-task.dto");
const auth_guard_1 = require("../guard/auth.guard");
const task_entity_1 = require("./entities/task.entity");
const swagger_1 = require("@nestjs/swagger");
let TaskController = class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    async create(createTaskDto, req) {
        try {
            const user = req.user;
            console.log(user, 'user');
            return this.taskService.create(createTaskDto, user);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid user');
        }
    }
    async findAll(req, fetchUsers, page, limit, status) {
        try {
            const user = req.user;
            return await this.taskService.findAll(user, fetchUsers, page, limit, status);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid user');
        }
    }
    async findOne(id, req) {
        try {
            const user = req.user;
            return this.taskService.findOne(+id, user);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid user');
        }
    }
    async update(id, updateTaskDto, req) {
        try {
            const user = req.user;
            return this.taskService.update(+id, updateTaskDto, user);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid user');
        }
    }
    async remove(id, req) {
        try {
            const user = req.user;
            return this.taskService.remove(+id, user);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid user');
        }
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new task' }),
    (0, swagger_1.ApiBody)({ type: create_task_dto_1.CreateTaskDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Task created successfully',
        type: task_entity_1.Task,
    }),
    (0, common_1.UseGuards)(auth_guard_1.TokenAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all tasks' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Retrieved all tasks successfully',
        type: [task_entity_1.Task],
    }),
    (0, common_1.UseGuards)(auth_guard_1.TokenAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('fetchUsers')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __param(4, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Boolean, Number, Number, String]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a task by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Task Fetched successfully',
        type: task_entity_1.Task,
    }),
    (0, common_1.UseGuards)(auth_guard_1.TokenAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a task by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Task updated successfully',
        type: task_entity_1.Task,
    }),
    (0, common_1.UseGuards)(auth_guard_1.TokenAuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_task_dto_1.UpdateTaskDto, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a task by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Task deleted successfully',
        type: task_entity_1.Task,
    }),
    (0, common_1.UseGuards)(auth_guard_1.TokenAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "remove", null);
exports.TaskController = TaskController = __decorate([
    (0, swagger_1.ApiTags)('Task'),
    (0, common_1.Controller)('tasks'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.TokenAuthGuard),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
//# sourceMappingURL=task.controller.js.map