import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RoleService {
    private readonly roleRepository;
    constructor(roleRepository: Repository<Role>);
    createDefaultRolesIfNotExist(): Promise<void>;
    private createRoleIfNotExist;
    create(createRoleDto: CreateRoleDto): Promise<string>;
    findAll(): Promise<string>;
    findOne(id: number): Promise<string>;
    update(id: number, updateRoleDto: UpdateRoleDto): Promise<string>;
    remove(id: number): Promise<string>;
}
