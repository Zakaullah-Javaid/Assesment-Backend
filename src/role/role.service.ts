// role.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async createDefaultRolesIfNotExist(): Promise<void> {
    await this.createRoleIfNotExist(1, 'admin');
    await this.createRoleIfNotExist(2, 'user');
  }

  private async createRoleIfNotExist(id: number, name: string): Promise<void> {
    const existingRole = await this.roleRepository.findOne({ where: { id } });
    if (!existingRole) {
      const role = new Role();
      role.id = id;
      role.name = name;
      await this.roleRepository.save(role);
    }
  }

  async create(createRoleDto: CreateRoleDto): Promise<string> {
    return 'This action adds a new role';
  }

  async findAll(): Promise<string> {
    return `This action returns all roles`;
  }

  async findOne(id: number): Promise<string> {
    return `This action returns a #${id} role`;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<string> {
    return `This action updates a #${id} role`;
  }

  async remove(id: number): Promise<string> {
    return `This action removes a #${id} role`;
  }
}
