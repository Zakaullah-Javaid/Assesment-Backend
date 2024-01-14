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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./entities/user.entity");
const role_entity_1 = require("../role/entities/role.entity");
let UserService = class UserService {
    constructor(userRepository, roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }
    async createAdminUser() {
        const adminRole = await this.roleRepository.findOne({ where: { id: 1 } });
        if (!adminRole) {
            throw new Error('Admin role not found');
        }
        const adminExists = await this.userRepository.findOne({
            where: { email: 'admin@example.com' },
        });
        if (!adminExists) {
            const adminUser = new user_entity_1.User();
            adminUser.name = 'Admin';
            adminUser.email = 'admin@example.com';
            adminUser.password =
                '$2b$10$jsWn3F2XWPtLJYl.NpMUJO26P9PTsCu1T3oSGm4JLnA5c2HmEIn/G';
            adminUser.validated = true;
            adminUser.role = adminRole;
            adminUser.adminId = null;
            await this.userRepository.save(adminUser);
        }
        else {
            console.log('Admin already exists.');
        }
    }
    async sendInvite(email, user) {
        try {
            let adminUser = await this.isAdmin(user.id);
            console.log(adminUser, 'adminUser');
            if (adminUser) {
                let adminId = user.id;
                const existingUser = await this.userRepository.findOne({
                    where: { email },
                });
                const userRole = await this.roleRepository.findOne({
                    where: { id: 2 },
                });
                if (!existingUser) {
                    let token = this.generateInviteToken(email, adminId);
                    const newUser = new user_entity_1.User();
                    newUser.email = email;
                    newUser.validated = false;
                    newUser.invitationToken = token;
                    newUser.password = 'temporarypassword';
                    newUser.role = userRole;
                    newUser.adminId = adminId;
                    await this.userRepository.save(newUser);
                    return token;
                }
                else {
                    throw new common_1.NotFoundException('User Already Exists');
                }
            }
            throw new common_1.UnauthorizedException('Only administrators can resend invitations');
        }
        catch (error) {
            console.error('Error in sendInvite:', error);
            throw new Error('Error sending invitation');
        }
    }
    generateInviteToken(email, adminId) {
        return jwt.sign({ email, adminId }, process.env.SECRET_KEY || 'your-secret-key', { expiresIn: '5m' });
    }
    async resendInvite(email, user) {
        try {
            let adminUser = await this.isAdmin(user.id);
            console.log(adminUser, 'adminUser');
            if (adminUser) {
                let adminId = user.id;
                const existingUser = await this.userRepository.findOne({
                    where: { email },
                });
                if (!existingUser) {
                    throw new common_1.NotFoundException('User not found');
                }
                if (existingUser.validated) {
                    throw new common_1.NotFoundException('User is already validated');
                }
                existingUser.invitationToken = this.generateInviteToken(email, adminId);
                await this.userRepository.save(existingUser);
                return existingUser.invitationToken;
            }
            else {
                throw new common_1.UnauthorizedException('Only administrators can resend invitations');
            }
        }
        catch (error) {
            console.error('Error in resendInvite:', error);
            throw error;
        }
    }
    async setNewPassword(email, password, invitationToken) {
        try {
            const user = await this.userRepository.findOne({
                where: { email },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            if (user.validated && !user.invitationToken) {
                throw new common_1.NotFoundException('Password already set');
            }
            try {
                jwt.verify(invitationToken, process.env.SECRET_KEY || 'your-secret-key');
            }
            catch (error) {
                throw new common_1.NotFoundException('Invalid or expired invitation token');
            }
            if (user.invitationToken !== invitationToken) {
                throw new common_1.NotFoundException('Invalid invitation token');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
            user.validated = true;
            user.invitationToken = null;
            await this.userRepository.save(user);
            return 'User created successfully';
        }
        catch (error) {
            console.error('Error in setNewPassword:', error);
            throw error;
        }
    }
    async findByEmail(email) {
        const user = await this.userRepository.findOne({
            where: { email },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (!user.validated) {
            throw new common_1.UnauthorizedException('User not validated');
        }
        return user;
    }
    async findById(id) {
        const user = await this.userRepository.findOne({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (!user.validated) {
            throw new common_1.UnauthorizedException('User not validated');
        }
        return user;
    }
    async isAdmin(id) {
        try {
            const user = await this.userRepository.findOne({ where: { id } });
            console.log(user, 'user search');
            if (!user) {
                return false;
            }
            return user.adminId === null;
        }
        catch (error) {
            console.error('Error in isAdmin:', error);
            throw error;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map