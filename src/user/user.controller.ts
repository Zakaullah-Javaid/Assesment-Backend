import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiProperty,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { TokenAuthGuard } from 'src/guard/auth.guard';

class InvitationDto {
  @ApiProperty({
    example: 'john@example.com',
    description: 'The email address to send the invitation',
  })
  email: string;
}

class SetPasswordDto {
  @ApiProperty({
    example: 'john@example.com',
    description: 'The email address of the user',
  })
  email: string;

  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  name: string;

  @ApiProperty({
    example: 'newpassword',
    description: 'The new password to be set',
  })
  password: string;

  @ApiProperty({
    example: 'invitationToken',
    description: 'The invitation token for validation',
  })
  invitationToken: string;
}
@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(TokenAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Send Invitation' })
  @ApiProperty({ name: 'email', type: String })
  @ApiBody({ type: InvitationDto })
  @ApiResponse({
    status: 200,
    description: 'Invitation sent successfully',
    type: String,
  })
  @Post('send-invite')
  async sendInvite(@Req() req, @Body('email') email: string): Promise<string> {
    try {
      const user = req.user;
      const token = await this.userService.sendInvite(email, user);
      return token;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @UseGuards(TokenAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Resend Invitation' })
  @ApiBody({ type: InvitationDto })
  @ApiProperty({ name: 'email', type: String })
  @ApiResponse({
    status: 200,
    description: 'Invitation resent successfully',
    type: String,
  })
  @Post('resend-invite')
  async resendInvite(
    @Req() req,
    @Body('email') email: string,
  ): Promise<string> {
    try {
      const user = req.user;
      const token = await this.userService.resendInvite(email, user);
      return token;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Set New Password' })
  @ApiProperty({ name: 'email', type: String })
  @ApiProperty({ name: 'password', type: String })
  @ApiProperty({ name: 'invitationToken', type: String })
  @ApiBody({ type: SetPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Password set successfully',
    type: String,
  })
  @Post('set-password')
  async setPassword(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('invitationToken') invitationToken: string,
  ): Promise<string> {
    try {
      const result = await this.userService.setNewPassword(
        email,
        password,
        invitationToken,
      );
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
