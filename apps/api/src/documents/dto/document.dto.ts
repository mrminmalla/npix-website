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
  // `fileType`/`fileSize`/`updatedDate` are intentionally absent: they're
  // derived server-side (DocumentsService.deriveFileMeta) from the actual
  // uploaded asset and the current timestamp, never admin-entered. Any
  // value a client sent for them would be silently ignored — the backend
  // is the source of truth here, not just the admin form.
  @IsOptional() @IsString() version?: string;
  @IsDateString() publishDate!: string;
  @IsOptional() @IsString() fileAssetId?: string;
  @IsOptional() @IsString() previewAssetId?: string;
  @IsOptional() content?: unknown;
  @IsOptional() @IsBoolean() isFeatured?: boolean;
  @IsOptional() @IsInt() sortOrder?: number;
}

export class UpdateDocumentDto extends PartialType(CreateDocumentDto) {}
