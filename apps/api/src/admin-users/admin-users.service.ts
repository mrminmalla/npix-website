import { Injectable } from '@nestjs/common';
import { AdminUser } from '@prisma/client';
import * as argon2 from 'argon2';
import { BaseCrudService } from '../common/base-crud.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdminUserDto, UpdateAdminUserDto } from './dto/admin-user.dto';

function redact(user: AdminUser) {
  const { passwordHash: _passwordHash, ...safe } = user;
  return safe;
}

@Injectable()
export class AdminUsersService extends BaseCrudService<AdminUser> {
  constructor(prisma: PrismaService) {
    super(prisma.adminUser);
  }

  async list() {
    const { items } = await this.findAll({ orderBy: { createdAt: 'asc' } });
    return items.map(redact);
  }

  async createUser(dto: CreateAdminUserDto) {
    const passwordHash = await argon2.hash(dto.password);
    const user = await this.create({
      email: dto.email,
      name: dto.name,
      role: dto.role,
      isActive: dto.isActive ?? true,
      passwordHash,
    });
    return redact(user);
  }

  async updateUser(id: string, dto: UpdateAdminUserDto) {
    const data: Record<string, unknown> = { ...dto };
    delete data.password;
    if (dto.password) data.passwordHash = await argon2.hash(dto.password);
    const user = await this.update(id, data);
    return redact(user);
  }
}
