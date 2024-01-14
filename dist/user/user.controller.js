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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../guard/auth.guard");
class InvitationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'john@example.com',
        description: 'The email address to send the invitation',
    }),
    __metadata("design:type", String)
], InvitationDto.prototype, "email", void 0);
class SetPasswordDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'john@example.com',
        description: 'The email address of the user',
    }),
    __metadata("design:type", String)
], SetPasswordDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe', description: 'The name of the user' }),
    __metadata("design:type", String)
], SetPasswordDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'newpassword',
        description: 'The new password to be set',
    }),
    __metadata("design:type", String)
], SetPasswordDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'invitationToken',
        description: 'The invitation token for validation',
    }),
    __metadata("design:type", String)
], SetPasswordDto.prototype, "invitationToken", void 0);
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async sendInvite(req, email) {
        try {
            const user = req.user;
            const token = await this.userService.sendInvite(email, user);
            return token;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async resendInvite(req, email) {
        try {
            const user = req.user;
            const token = await this.userService.resendInvite(email, user);
            return token;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async setPassword(email, password, invitationToken) {
        try {
            const result = await this.userService.setNewPassword(email, password, invitationToken);
            return result;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.TokenAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Send Invitation' }),
    (0, swagger_1.ApiProperty)({ name: 'email', type: String }),
    (0, swagger_1.ApiBody)({ type: InvitationDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Invitation sent successfully',
        type: String,
    }),
    (0, common_1.Post)('send-invite'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "sendInvite", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.TokenAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Resend Invitation' }),
    (0, swagger_1.ApiBody)({ type: InvitationDto }),
    (0, swagger_1.ApiProperty)({ name: 'email', type: String }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Invitation resent successfully',
        type: String,
    }),
    (0, common_1.Post)('resend-invite'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resendInvite", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Set New Password' }),
    (0, swagger_1.ApiProperty)({ name: 'email', type: String }),
    (0, swagger_1.ApiProperty)({ name: 'password', type: String }),
    (0, swagger_1.ApiProperty)({ name: 'invitationToken', type: String }),
    (0, swagger_1.ApiBody)({ type: SetPasswordDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Password set successfully',
        type: String,
    }),
    (0, common_1.Post)('set-password'),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)('password')),
    __param(2, (0, common_1.Body)('invitationToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setPassword", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map