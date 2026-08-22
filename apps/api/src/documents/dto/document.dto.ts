import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateDocumentDto {
  @IsString() @MinLength(1) title!: string;
  @IsString() @MinLength(1) description!: string;
  @IsString() categoryId!: string;
  @IsOptional() @IsArray() @IsString({ each: true }) tags?: string[];
  @IsString() fileType!: string;
  @IsOptional() @IsString() fileSize?: string;
  @IsOptional() @IsString() version?: string;
  @IsDateString() publishDate!: string;
  @IsDateString() updatedDate!: string;
  @IsOptional() @IsString() fileAssetId?: string;
  @IsOptional() @IsString() previewAssetId?: string;
  @IsOptional() content?: unknown;
  @IsOptional() @IsBoolean() isFeatured?: boolean;
  @IsOptional() @IsInt() sortOrder?: number;
}

export class UpdateDocumentDto extends PartialType(CreateDocumentDto) {}
