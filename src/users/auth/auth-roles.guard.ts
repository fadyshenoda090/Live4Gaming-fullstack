import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { current_user_key } from '../../utils/constants';

import { JWTPayloadType } from '../../utils/types';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../utils/enums';
import { UsersService } from '../users.service';

@Injectable()
export class AuthRolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly reflector: Reflector,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles: UserRole[] = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles || roles.length === 0) {
      return false;
    }

    const req = context.switchToHttp().getRequest<Request>();

    const errorMessage = 'Access denied, invalid or expired token';

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException(errorMessage);
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException(errorMessage);
    }

    try {
      const payload = await this.jwtService.verifyAsync<JWTPayloadType>(token, {
        secret: this.config.getOrThrow<string>('JWT_SECRET'),
      });
      const user = await this.userService.getUserProfile(payload.id);
      if (!user) return false;

      if (!roles.includes(user.role)) {
        return false;
      }

      req[current_user_key] = payload;
      return true;
    } catch {
      throw new UnauthorizedException(errorMessage);
    }
  }
}
