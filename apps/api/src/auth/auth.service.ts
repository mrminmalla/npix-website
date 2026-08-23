import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from './types';

const INVALID_CREDENTIALS_MESSAGE = 'Invalid username/email or password.';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  /**
   * Looks a user up by either username or email — whichever the submitted
   * identifier matches — case-insensitively either way. Deliberately a
   * single generic failure message regardless of *why* it failed (no such
   * identifier, wrong password, inactive account) so a login attempt can't
   * be used to enumerate which usernames/emails exist.
   */
  async validateCredentials(identifier: string, password: string) {
    const trimmed = identifier.trim();
    const user = await this.prisma.adminUser.findFirst({
      where: {
        OR: [
          { username: { equals: trimmed, mode: 'insensitive' } },
          { email: { equals: trimmed, mode: 'insensitive' } },
        ],
      },
    });
    if (!user || !user.isActive) {
      throw new UnauthorizedException(INVALID_CREDENTIALS_MESSAGE);
    }
    const passwordMatches = await argon2.verify(user.passwordHash, password);
    if (!passwordMatches) {
      throw new UnauthorizedException(INVALID_CREDENTIALS_MESSAGE);
    }
    return user;
  }

  async issueTokens(payload: JwtPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, {
        secret: this.config.getOrThrow<string>('JWT_ACCESS_SECRET'),
        // The nestjs/jwt types want a narrow "StringValue" literal for
        // expiresIn; env vars are plain strings, so we cast at the boundary.
        expiresIn: this.config.get<string>('JWT_ACCESS_TTL', '15m') as never,
      }),
      this.jwt.signAsync(payload, {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.config.get<string>('JWT_REFRESH_TTL', '7d') as never,
      }),
    ]);
    return { accessToken, refreshToken };
  }

  async login(identifier: string, password: string) {
    const user = await this.validateCredentials(identifier, password);
    await this.prisma.adminUser.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });
    const tokens = await this.issueTokens({ sub: user.id, email: user.email, role: user.role });
    return {
      tokens,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async refresh(refreshToken: string) {
    let payload: JwtPayload;
    try {
      payload = await this.jwt.verifyAsync<JwtPayload>(refreshToken, {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
    const user = await this.prisma.adminUser.findUnique({ where: { id: payload.sub } });
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
    return this.issueTokens({ sub: user.id, email: user.email, role: user.role });
  }

  async me(userId: string) {
    const user = await this.prisma.adminUser.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException();
    return { id: user.id, username: user.username, email: user.email, name: user.name, role: user.role };
  }
}
