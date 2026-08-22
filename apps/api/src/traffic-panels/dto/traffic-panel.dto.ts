import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsInt, IsOptional, IsString, IsUrl, MinLength } from 'class-validator';

export class CreateTrafficPanelDto {
  @IsString() @MinLength(1) label!: string;
  @IsString() @MinLength(1) sublabel!: string;
  @IsUrl({ require_tld: false }) embedUrl!: string;
  @IsOptional() @IsInt() sortOrder?: number;
  @IsOptional() @IsBoolean() isActive?: boolean;
}

export class UpdateTrafficPanelDto extends PartialType(CreateTrafficPanelDto) {}
