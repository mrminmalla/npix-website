import { PartialType, OmitType } from '@nestjs/mapped-types';
import { IsBoolean, IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { AdminRole } from '@prisma/client';

export class CreateAdminUserDto {
  @IsEmail() email!: string;
  @IsString() @MinLength(8) password!: string;
  @IsString() @MinLength(1) name!: string;
  @IsEnum(AdminRole) role!: AdminRole;
  @IsOptional() @IsBoolean() isActive?: boolean;
}

export class UpdateAdminUserDto extends PartialType(
  OmitType(CreateAdminUserDto, ['password'] as const),
) {
  @IsOptional() @IsString() @MinLength(8) password?: string;
}
