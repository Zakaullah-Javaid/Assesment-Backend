// create-user.dto.ts
import { IsOptional, IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user (optional)',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'The unique email address of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    example: false,
    description:
      'Indicates whether the user has been validated (default: false)',
  })
  @IsOptional()
  @IsNotEmpty()
  validated?: boolean;

  @ApiProperty({
    example: 'invitation_token',
    description: 'Token used for user invitation (optional)',
  })
  @IsOptional()
  @IsString()
  invitationToken?: string;

  @ApiProperty({
    example: null,
    description: 'The ID of the admin user (optional)',
  })
  @IsOptional()
  @IsNotEmpty()
  adminId?: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the role assigned to the user',
  })
  @IsNotEmpty()
  role: number;
}
