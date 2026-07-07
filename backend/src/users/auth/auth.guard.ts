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

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (req as any)[current_user_key] =
        await this.jwtService.verifyAsync<JWTPayloadType>(token, {
          secret: this.config.getOrThrow<string>('JWT_SECRET'),
        });

      return true;
    } catch {
      throw new UnauthorizedException(errorMessage);
    }
  }
}
