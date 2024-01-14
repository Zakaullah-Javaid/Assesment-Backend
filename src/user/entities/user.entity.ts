// user.entity.ts
import { Role } from 'src/role/entities/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Task } from 'src/task/entities/task.entity'; // Import the Task entity

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name?: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  validated: boolean;

  @Column({ nullable: true })
  invitationToken: string;

  @Column({ default: null, nullable: true })
  adminId: number;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(() => Task, (task) => task.user) // Define the one-to-many relationship
  tasks: Task[]; // Array to store the associated tasks
}
