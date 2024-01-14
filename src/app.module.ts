// app.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './data-source/DataSource';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
// import { SeederService } from './seeder/seeder';

@Module({
  exports: [TypeOrmModule],
  imports: [
    TypeOrmModule.forRoot(dataSource.options),

    JwtModule.register({
      secret: process.env.SECRET_KEY || 'your-secret-key',
      signOptions: { expiresIn: '1h' }, // Set the expiration time
    }),

    UserModule,

    RoleModule,

    AuthModule,

    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
