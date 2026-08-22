import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsInt, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { StatSection } from '@prisma/client';

export class CreateStatCardDto {
  @IsEnum(StatSection) section!: StatSection;
  @IsString() @MinLength(1) label!: string;
  @IsNumber() value!: number;
  @IsOptional() @IsString() prefix?: string;
  @IsOptional() @IsString() suffix?: string;
  @IsOptional() @IsInt() decimals?: number;
  @IsString() iconName!: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsInt() sortOrder?: number;
}

export class UpdateStatCardDto extends PartialType(CreateStatCardDto) {}
