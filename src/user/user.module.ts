import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RoleModule } from 'src/role/role.module';
import { Role } from 'src/role/entities/role.entity';
import { Task } from 'src/task/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Task])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // If you need to use UserService in other modules
})
export class UserModule {}
