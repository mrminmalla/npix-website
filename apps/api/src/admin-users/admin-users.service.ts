import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { AdminRole, AdminUser, Prisma } from '@prisma/client';
import * as argon2 from 'argon2';
import { BaseCrudService } from '../common/base-crud.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdminUserDto, UpdateAdminUserDto } from './dto/admin-user.dto';

function redact(user: AdminUser) {
  const { passwordHash: _passwordHash, ...safe } = user;
  return safe;
}

/**
 * Prisma's unique-constraint violation code (P2002) doesn't say which field
 * in a user-facing way — `meta.target` names the column(s)/index. That's an
 * array of column names for constraints Prisma itself manages, but a plain
 * constraint-name string for the hand-written case-insensitive functional
 * index (admin_users_username_lower_key), so handle both shapes.
 */
function conflictField(err: unknown): string | null {
  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
    const target = err.meta?.target;
    const text = (Array.isArray(target) ? target.join(' ') : String(target ?? '')).toLowerCase();
    if (text.includes('username')) return 'username';
    if (text.includes('email')) return 'email';
  }
  return null;
}

type Tx = Prisma.TransactionClient;

@Injectable()
export class AdminUsersService extends BaseCrudService<AdminUser> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.adminUser);
  }

  async list() {
    const { items } = await this.findAll({ orderBy: { createdAt: 'asc' } });
    return items.map(redact);
  }

  async createUser(dto: CreateAdminUserDto) {
    const passwordHash = await argon2.hash(dto.password);
    try {
      const user = await this.create({
        username: dto.username,
        email: dto.email,
        name: dto.name,
        role: dto.role,
        isActive: dto.isActive ?? true,
        passwordHash,
      });
      return redact(user);
    } catch (err) {
      const field = conflictField(err);
      if (field) throw new ConflictException(`That ${field} is already in use.`);
      throw err;
    }
  }

  async updateUser(id: string, dto: UpdateAdminUserDto) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const target = await tx.adminUser.findUnique({ where: { id } });
        if (!target) throw new NotFoundException(`Resource with id "${id}" not found`);

        const nextRole = dto.role ?? target.role;
        const nextActive = dto.isActive ?? target.isActive;
        const wasActiveSuperAdmin = target.role === AdminRole.SUPER_ADMIN && target.isActive;
        const staysActiveSuperAdmin = nextRole === AdminRole.SUPER_ADMIN && nextActive;

        if (wasActiveSuperAdmin && !staysActiveSuperAdmin) {
          const reason =
            dto.role !== undefined && dto.role !== AdminRole.SUPER_ADMIN
              ? "You cannot change the last active Super Admin's role. Create another Super Admin before changing this account's role."
              : 'You cannot deactivate the last active Super Admin. Another active Super Admin must exist first.';
          await this.assertAnotherActiveSuperAdminExists(tx, id, reason);
        }

        const data: Record<string, unknown> = { ...dto };
        delete data.password;
        if (dto.password) data.passwordHash = await argon2.hash(dto.password);

        const user = await tx.adminUser.update({ where: { id }, data });
        return redact(user);
      });
    } catch (err) {
      const field = conflictField(err);
      if (field) throw new ConflictException(`That ${field} is already in use.`);
      throw err;
    }
  }

  /**
   * Named distinctly from BaseCrudService.remove (same reason createUser/
   * updateUser are distinct from create/update: this returns a redacted
   * shape, which isn't a valid override of the base method's return type)
   * — deleting an admin user needs the same last-active-Super-Admin
   * protection as updateUser, and fixes a pre-existing gap where the
   * inherited base method returned the raw deleted row, password hash
   * included; every other resource this base class manages has no
   * sensitive fields, but this one does.
   */
  async removeUser(id: string) {
    return this.prisma.$transaction(async (tx) => {
      const target = await tx.adminUser.findUnique({ where: { id } });
      if (!target) throw new NotFoundException(`Resource with id "${id}" not found`);

      if (target.role === AdminRole.SUPER_ADMIN && target.isActive) {
        await this.assertAnotherActiveSuperAdminExists(
          tx,
          id,
          'You cannot delete the last active Super Admin. Create another Super Admin before deleting this account.',
        );
      }

      const deleted = await tx.adminUser.delete({ where: { id } });
      return redact(deleted);
    });
  }

  /**
   * Locks every admin_users row for the duration of the transaction (the
   * table is tiny and this is a rare, human-driven operation, so
   * table-scoped locking is simpler and safer than fighting Postgres enum
   * parameter typing for a narrower SELECT) and verifies at least one
   * *other* active Super Admin exists. Locking happens before the count is
   * read, so two concurrent requests that would otherwise both "pass" and
   * jointly zero out the Super Admin count instead serialize: the second
   * transaction only proceeds after the first commits, by which point the
   * first request's change is visible and the count reflects reality.
   */
  private async assertAnotherActiveSuperAdminExists(tx: Tx, excludeId: string, reason: string) {
    const rows = await tx.$queryRaw<{ id: string; role: AdminRole; is_active: boolean }[]>`
      SELECT id, role, is_active FROM "admin_users" FOR UPDATE
    `;
    const otherActiveSuperAdmins = rows.filter(
      (row) => row.id !== excludeId && row.role === AdminRole.SUPER_ADMIN && row.is_active,
    );
    if (otherActiveSuperAdmins.length === 0) {
      throw new ConflictException(reason);
    }
  }
}
