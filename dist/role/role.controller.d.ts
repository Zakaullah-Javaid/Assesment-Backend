import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    create(createRoleDto: CreateRoleDto): Promise<string>;
    findAll(): Promise<string>;
    findOne(id: string): Promise<string>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<string>;
    remove(id: string): Promise<string>;
}
