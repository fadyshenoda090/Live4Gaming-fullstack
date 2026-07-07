import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { current_user_key } from '../../utils/constants';
import { JWTPayloadType } from '../../utils/types';

export const UserProfile = createParamDecorator(
  (data: keyof JWTPayloadType | undefined, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest<Request>();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const user = (req as any)[current_user_key] as JWTPayloadType;

    return data ? user?.[data] : user;
  },
);
