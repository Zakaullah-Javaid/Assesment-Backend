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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const user_service_1 = require("../user/user.service");
let TokenAuthGuard = class TokenAuthGuard {
    constructor(userService) {
        this.userService = userService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authorizationHeader = request.headers['authorization'];
        if (!authorizationHeader) {
            return false;
        }
        const [bearer, token] = authorizationHeader.split(' ');
        if (bearer !== 'Bearer' || !token) {
            return false;
        }
        try {
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY || 'your-secret-key');
            const user = await this.userService.findById(decodedToken.id);
            request.user = user;
            return !!user;
        }
        catch (error) {
            return false;
        }
    }
};
exports.TokenAuthGuard = TokenAuthGuard;
exports.TokenAuthGuard = TokenAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], TokenAuthGuard);
//# sourceMappingURL=auth.guard.js.map