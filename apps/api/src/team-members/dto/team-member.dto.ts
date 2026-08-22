import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTeamMemberDto {
  @IsString() @MinLength(1) name!: string;
  @IsString() @MinLength(1) role!: string;
  @IsString() @MinLength(1) bio!: string;
  @IsOptional() @IsString() photoAssetId?: string;
  @IsOptional() @IsInt() sortOrder?: number;
  @IsOptional() @IsBoolean() isActive?: boolean;
}

export class UpdateTeamMemberDto extends PartialType(CreateTeamMemberDto) {}
