import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async createAdminUser(): Promise<void> {
    const adminRole = await this.roleRepository.findOne({ where: { id: 1 } });

    if (!adminRole) {
      throw new Error('Admin role not found');
    }

    const adminExists = await this.userRepository.findOne({
      where: { email: 'admin@example.com' },
    });

    if (!adminExists) {
      const adminUser = new User();
      adminUser.name = 'Admin';
      adminUser.email = 'admin@example.com';
      adminUser.password =
        '$2b$10$jsWn3F2XWPtLJYl.NpMUJO26P9PTsCu1T3oSGm4JLnA5c2HmEIn/G';
      adminUser.validated = true;
      adminUser.role = adminRole;
      adminUser.adminId = null;
      await this.userRepository.save(adminUser);
    } else {
      // Admin already exists, you may choose to log a message or handle it accordingly.
      console.log('Admin already exists.');
    }
  }

  async sendInvite(email: string, user: User): Promise<string> {
    try {
      // Check if the user is an administrator
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
          const newUser = new User();
          newUser.email = email;
          newUser.validated = false;
          newUser.invitationToken = token;
          newUser.password = 'temporarypassword';
          newUser.role = userRole;
          newUser.adminId = adminId;
          await this.userRepository.save(newUser);
          return token;
        } else {
          throw new NotFoundException('User Already Exists');
        }
      }
      throw new UnauthorizedException(
        'Only administrators can resend invitations',
      );
    } catch (error) {
      console.error('Error in sendInvite:', error);
      throw new Error('Error sending invitation');
    }
  }

  private generateInviteToken(email: string, adminId: number): string {
    return jwt.sign(
      { email, adminId },
      process.env.SECRET_KEY || 'your-secret-key',
      { expiresIn: '5m' },
    );
  }

  async resendInvite(email: string, user: User): Promise<string> {
    try {
      // Check if the user is an administrator

      let adminUser = await this.isAdmin(user.id);
      console.log(adminUser, 'adminUser');
      if (adminUser) {
        let adminId = user.id;
        const existingUser = await this.userRepository.findOne({
          where: { email },
        });

        if (!existingUser) {
          throw new NotFoundException('User not found');
        }

        if (existingUser.validated) {
          throw new NotFoundException('User is already validated');
        }

        // Update invitation token and expiration time
        existingUser.invitationToken = this.generateInviteToken(email, adminId);
        await this.userRepository.save(existingUser);
        return existingUser.invitationToken;
      } else {
        throw new UnauthorizedException(
          'Only administrators can resend invitations',
        );
      }
    } catch (error) {
      console.error('Error in resendInvite:', error);
      throw error;
    }
  }

  async setNewPassword(
    email: string,
    password: string,
    invitationToken: string,
  ): Promise<string> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (user.validated && !user.invitationToken) {
        throw new NotFoundException('Password already set');
      }

      // Check if the invitation token is still valid
      try {
        jwt.verify(
          invitationToken,
          process.env.SECRET_KEY || 'your-secret-key',
        );
      } catch (error) {
        throw new NotFoundException('Invalid or expired invitation token');
      }

      if (user.invitationToken !== invitationToken) {
        throw new NotFoundException('Invalid invitation token');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.validated = true;
      user.invitationToken = null;
      await this.userRepository.save(user);

      return 'User created successfully'; // Return success message
    } catch (error) {
      console.error('Error in setNewPassword:', error);
      throw error;
    }
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.validated) {
      throw new UnauthorizedException('User not validated');
    }

    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.validated) {
      throw new UnauthorizedException('User not validated');
    }

    return user;
  }

  async isAdmin(id: number): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      console.log(user, 'user search');
      if (!user) {
        return false; // If the user or their role is undefined, consider them not an admin
      }

      return user.adminId === null; // Assuming the role ID for an admin is 1
    } catch (error) {
      console.error('Error in isAdmin:', error);
      throw error; // You may want to handle or log the error according to your application's needs
    }
  }
}
