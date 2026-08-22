import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePageSectionDto {
  @IsString() @MinLength(1) pageSlug!: string;
  @IsString() @MinLength(1) sectionKey!: string;
  @IsOptional() @IsString() eyebrow?: string;
  @IsString() @MinLength(1) heading!: string;
  @IsString() @MinLength(1) body!: string;
  @IsOptional() @IsString() iconName?: string;
  @IsOptional() @IsInt() sortOrder?: number;
}

export class UpdatePageSectionDto extends PartialType(CreatePageSectionDto) {}
