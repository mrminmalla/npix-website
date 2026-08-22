import { AdminRole } from '@prisma/client';

export interface JwtPayload {
  sub: string;
  email: string;
  role: AdminRole;
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: AdminRole;
}
