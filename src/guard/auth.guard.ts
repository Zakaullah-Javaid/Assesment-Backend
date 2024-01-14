import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TokenAuthGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Check if Authorization header is present
    const authorizationHeader = request.headers['authorization'];
    if (!authorizationHeader) {
      return false;
    }

    // Check if the header starts with 'Bearer'
    const [bearer, token] = authorizationHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      return false;
    }

    try {
      // Decode and verify the JWT token
      const decodedToken = jwt.verify(
        token,
        process.env.SECRET_KEY || 'your-secret-key',
      ) as {
        id: number;
      };

      // Fetch user from the database using the user ID
      const user = await this.userService.findById(decodedToken.id);

      // Store the user information in the request for later use
      request.user = user;

      // Return true if the user exists, false otherwise
      return !!user;
    } catch (error) {
      // Token verification failed
      return false;
    }
  }
}
