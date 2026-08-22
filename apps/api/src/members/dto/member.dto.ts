import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, MinLength } from 'class-validator';
import { MemberCategory } from '@prisma/client';

export class CreateMemberDto {
  @IsString() @MinLength(1) name!: string;
  @IsString() @MinLength(1) asn!: string;
  @IsOptional() @IsString() website?: string;
  @IsOptional() @IsString() ipAddress?: string;
  @IsOptional() @IsString() ipv6Address?: string;
  @IsOptional() @IsString() datahubIp?: string;
  @IsOptional() @IsString() datahubIpv6?: string;
  @IsEnum(MemberCategory) category!: MemberCategory;
  @IsOptional() @IsString() logoAssetId?: string;
  @IsOptional() @IsInt() sortOrder?: number;
  @IsOptional() @IsBoolean() isActive?: boolean;
}

export class UpdateMemberDto extends PartialType(CreateMemberDto) {}
