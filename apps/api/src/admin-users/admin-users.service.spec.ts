import { ConflictException } from '@nestjs/common';
import { AdminRole } from '@prisma/client';
import { AdminUsersService } from './admin-users.service';
import { PrismaService } from '../prisma/prisma.service';

/**
 * A minimal in-memory fake of the parts of PrismaService this service
 * actually uses. `$transaction` is a real async mutex — only one callback
 * runs at a time — because that's exactly what Postgres's `SELECT ...
 * FOR UPDATE` guarantees in production for two transactions contending on
 * the same locked rows: the second one only proceeds once the first has
 * committed (and its effects are visible). Faking that serialization here
 * is what makes the concurrency test meaningful instead of trivially
 * racy.
 */
function createFakePrisma() {
  const users: Record<string, unknown>[] = [];
  let idCounter = 0;

  const adminUser = {
    findUnique: jest.fn(async ({ where: { id } }: { where: { id: string } }) =>
      users.find((u) => u.id === id) ?? null,
    ),
    findMany: jest.fn(async () => [...users]),
    count: jest.fn(async () => users.length),
    create: jest.fn(async ({ data }: { data: Record<string, unknown> }) => {
      if (users.some((u) => u.username === data.username || u.email === data.email)) {
        const err = new Error('Unique constraint failed') as Error & {
          code: string;
          meta: { target: string[] };
        };
        err.code = 'P2002';
        err.meta = { target: [users.some((u) => u.username === data.username) ? 'username' : 'email'] };
        throw err;
      }
      const row = {
        id: `user-${++idCounter}`,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...data,
      };
      users.push(row);
      return row;
    }),
    update: jest.fn(async ({ where: { id }, data }: { where: { id: string }; data: Record<string, unknown> }) => {
      const row = users.find((u) => u.id === id);
      if (!row) throw new Error('not found');
      Object.assign(row, data);
      return row;
    }),
    delete: jest.fn(async ({ where: { id } }: { where: { id: string } }) => {
      const index = users.findIndex((u) => u.id === id);
      if (index === -1) throw new Error('not found');
      const [removed] = users.splice(index, 1);
      return removed;
    }),
  };

  let mutex: Promise<unknown> = Promise.resolve();
  const prisma: {
    adminUser: typeof adminUser;
    $queryRaw: jest.Mock;
    $transaction: jest.Mock;
  } = {
    adminUser,
    $queryRaw: jest.fn(async () =>
      users.map((u) => ({ id: u.id, role: u.role, is_active: u.isActive })),
    ),
    $transaction: jest.fn((cb: (tx: unknown) => Promise<unknown>) => {
      const run: Promise<unknown> = mutex.then(() => cb(prisma));
      // Chain regardless of outcome so a rejection doesn't wedge the queue.
      mutex = run.then(
        () => undefined,
        () => undefined,
      );
      return run;
    }),
  };

  return { prisma, users };
}

function seedUser(
  users: Record<string, unknown>[],
  overrides: Partial<{ id: string; role: AdminRole; isActive: boolean; username: string; email: string }>,
) {
  const row = {
    id: overrides.id ?? `seed-${users.length + 1}`,
    username: overrides.username ?? `user${users.length + 1}`,
    email: overrides.email ?? `user${users.length + 1}@example.com`,
    name: 'Seed User',
    role: overrides.role ?? AdminRole.EDITOR,
    isActive: overrides.isActive ?? true,
    passwordHash: 'hash',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  users.push(row);
  return row;
}

describe('AdminUsersService — last active Super Admin protection', () => {
  let fake: ReturnType<typeof createFakePrisma>;
  let service: AdminUsersService;

  beforeEach(() => {
    fake = createFakePrisma();
    service = new AdminUsersService(fake.prisma as unknown as PrismaService);
  });

  describe('delete', () => {
    it('rejects deleting the last active Super Admin', async () => {
      const admin = seedUser(fake.users, { role: AdminRole.SUPER_ADMIN });
      await expect(service.removeUser(admin.id as string)).rejects.toThrow(ConflictException);
      expect(fake.users).toHaveLength(1);
    });

    it('allows deleting a Super Admin when another active one exists', async () => {
      const a = seedUser(fake.users, { role: AdminRole.SUPER_ADMIN });
      seedUser(fake.users, { role: AdminRole.SUPER_ADMIN });
      await expect(service.removeUser(a.id as string)).resolves.toBeDefined();
      expect(fake.users).toHaveLength(1);
    });

    it('does not protect an already-inactive Super Admin (they are not "the last active" one)', async () => {
      const inactiveAdmin = seedUser(fake.users, { role: AdminRole.SUPER_ADMIN, isActive: false });
      await expect(service.removeUser(inactiveAdmin.id as string)).resolves.toBeDefined();
    });

    it('still allows deleting normal (non-Super-Admin) users', async () => {
      seedUser(fake.users, { role: AdminRole.SUPER_ADMIN }); // keeps an admin around
      const editor = seedUser(fake.users, { role: AdminRole.EDITOR });
      await expect(service.removeUser(editor.id as string)).resolves.toBeDefined();
      expect(fake.users).toHaveLength(1);
    });

    it('enforces the rule at the service layer directly, independent of any UI', async () => {
      // Simulates a direct API call bypassing any frontend disabled-button
      // logic: nothing here goes through a controller or form, just the
      // service method the controller calls.
      const admin = seedUser(fake.users, { role: AdminRole.SUPER_ADMIN });
      await expect(service.removeUser(admin.id as string)).rejects.toThrow(
        /cannot delete the last active Super Admin/i,
      );
    });
  });

  describe('deactivate (update isActive -> false)', () => {
    it('rejects deactivating the last active Super Admin', async () => {
      const admin = seedUser(fake.users, { role: AdminRole.SUPER_ADMIN });
      await expect(service.updateUser(admin.id as string, { isActive: false })).rejects.toThrow(
        ConflictException,
      );
      expect(admin.isActive).toBe(true);
    });

    it('allows deactivating a Super Admin when another active one exists', async () => {
      const a = seedUser(fake.users, { role: AdminRole.SUPER_ADMIN });
      seedUser(fake.users, { role: AdminRole.SUPER_ADMIN });
      await service.updateUser(a.id as string, { isActive: false });
      expect(a.isActive).toBe(false);
    });

    it('still allows deactivating normal users', async () => {
      seedUser(fake.users, { role: AdminRole.SUPER_ADMIN });
      const editor = seedUser(fake.users, { role: AdminRole.EDITOR });
      await service.updateUser(editor.id as string, { isActive: false });
      expect(editor.isActive).toBe(false);
    });
  });

  describe('role change', () => {
    it("rejects changing the last active Super Admin's role", async () => {
      const admin = seedUser(fake.users, { role: AdminRole.SUPER_ADMIN });
      await expect(
        service.updateUser(admin.id as string, { role: AdminRole.EDITOR }),
      ).rejects.toThrow(ConflictException);
      expect(admin.role).toBe(AdminRole.SUPER_ADMIN);
    });

    it("allows changing a Super Admin's role when another active one exists", async () => {
      const a = seedUser(fake.users, { role: AdminRole.SUPER_ADMIN });
      seedUser(fake.users, { role: AdminRole.SUPER_ADMIN });
      await service.updateUser(a.id as string, { role: AdminRole.EDITOR });
      expect(a.role).toBe(AdminRole.EDITOR);
    });
  });

  describe('create', () => {
    it('allows creating additional Super Admins', async () => {
      seedUser(fake.users, { role: AdminRole.SUPER_ADMIN });
      const created = await service.createUser({
        name: 'New Admin',
        username: 'newadmin',
        email: 'newadmin@example.com',
        password: 'password123',
        role: AdminRole.SUPER_ADMIN,
      });
      expect(created).toMatchObject({ role: AdminRole.SUPER_ADMIN });
      expect(fake.users).toHaveLength(2);
    });
  });

  describe('concurrency', () => {
    it('does not let two concurrent deletes leave zero active Super Admins', async () => {
      const a = seedUser(fake.users, { role: AdminRole.SUPER_ADMIN });
      const b = seedUser(fake.users, { role: AdminRole.SUPER_ADMIN });

      const results = await Promise.allSettled([
        service.removeUser(a.id as string),
        service.removeUser(b.id as string),
      ]);

      const fulfilled = results.filter((r) => r.status === 'fulfilled');
      const rejected = results.filter((r) => r.status === 'rejected');
      expect(fulfilled).toHaveLength(1);
      expect(rejected).toHaveLength(1);

      const remainingActiveSuperAdmins = fake.users.filter(
        (u) => u.role === AdminRole.SUPER_ADMIN && u.isActive,
      );
      expect(remainingActiveSuperAdmins).toHaveLength(1);
    });

    it('does not let a concurrent delete + deactivate leave zero active Super Admins', async () => {
      const a = seedUser(fake.users, { role: AdminRole.SUPER_ADMIN });
      const b = seedUser(fake.users, { role: AdminRole.SUPER_ADMIN });

      const results = await Promise.allSettled([
        service.removeUser(a.id as string),
        service.updateUser(b.id as string, { isActive: false }),
      ]);

      const succeeded = results.filter((r) => r.status === 'fulfilled').length;
      expect(succeeded).toBe(1);

      const remainingActiveSuperAdmins = fake.users.filter(
        (u) => u.role === AdminRole.SUPER_ADMIN && u.isActive,
      );
      expect(remainingActiveSuperAdmins).toHaveLength(1);
    });
  });
});
