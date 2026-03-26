import { UserRole } from './enums';

export type JWTPayloadType = {
  id: number;
  role: UserRole;
};
