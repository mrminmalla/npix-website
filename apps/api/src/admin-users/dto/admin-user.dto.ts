import { PartialType, OmitType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsEnum, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { AdminRole } from '@prisma/client';

/** Letters, numbers, underscore, hyphen, and period — matches the existing
 *  project's other slug-like identifiers (e.g. document category ids). */
const USERNAME_PATTERN = /^[A-Za-z0-9._-]{3,32}$/;

export class CreateAdminUserDto {
  @IsString() @MinLength(1) name!: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @Matches(USERNAME_PATTERN, {
    message: 'Username must be 3-32 characters: letters, numbers, dots, underscores, or hyphens.',
  })
  username!: string;

  @IsEmail() email!: string;
  @IsString() @MinLength(8) password!: string;
  @IsEnum(AdminRole) role!: AdminRole;
  @IsOptional() @IsBoolean() isActive?: boolean;
}

export class UpdateAdminUserDto extends PartialType(
  OmitType(CreateAdminUserDto, ['password'] as const),
) {
  @IsOptional() @IsString() @MinLength(8) password?: string;
}
