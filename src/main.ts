import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { UserService } from './user/user.service';
import { RoleService } from './role/role.service';

import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  const roleService = app.get(RoleService);
  const userService = app.get(UserService);
  await roleService.createDefaultRolesIfNotExist();
  await userService.createAdminUser();

  const config = new DocumentBuilder()
    .setTitle('Node Api')
    .setDescription('Node Test Task')
    .setVersion('1.0')
    .addTag('Assignment')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
