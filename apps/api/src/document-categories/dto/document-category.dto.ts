import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateDocumentCategoryDto {
  @IsString() @MinLength(1) slug!: string;
  @IsString() @MinLength(1) title!: string;
  @IsString() @MinLength(1) description!: string;
  @IsString() iconName!: string;
  @IsOptional() @IsInt() sortOrder?: number;
}

export class UpdateDocumentCategoryDto extends PartialType(CreateDocumentCategoryDto) {}
