"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const user_service_1 = require("./user/user.service");
const role_service_1 = require("./role/role.service");
const dotenv = require("dotenv");
async function bootstrap() {
    dotenv.config();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const roleService = app.get(role_service_1.RoleService);
    const userService = app.get(user_service_1.UserService);
    await roleService.createDefaultRolesIfNotExist();
    await userService.createAdminUser();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Node Api')
        .setDescription('Node Test Task')
        .setVersion('1.0')
        .addTag('Assignment')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map