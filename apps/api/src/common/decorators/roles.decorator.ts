import { SetMetadata } from '@nestjs/common';
import { AdminRole } from '@prisma/client';

export const ROLES_KEY = 'roles';

/** Restricts a route to admins holding one of the given roles. */
export const Roles = (...roles: AdminRole[]) => SetMetadata(ROLES_KEY, roles);
