import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsDateString, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { ContentStatus, NewsCategory } from '@prisma/client';

export class CreateNewsEventDto {
  @IsString() @MinLength(1) title!: string;
  @IsOptional() @IsString() slug?: string;
  @IsEnum(NewsCategory) category!: NewsCategory;
  @IsString() @MinLength(1) summary!: string;
  @IsString() @MinLength(1) content!: string;
  @IsOptional() @IsString() location?: string;
  @IsOptional() @IsString() featuredImageAssetId?: string;
  @IsOptional() @IsBoolean() isFeatured?: boolean;
  @IsOptional() @IsEnum(ContentStatus) status?: ContentStatus;
  @IsDateString() publishedAt!: string;
}

export class UpdateNewsEventDto extends PartialType(CreateNewsEventDto) {}
