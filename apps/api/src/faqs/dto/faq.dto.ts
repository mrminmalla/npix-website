import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateFaqDto {
  @IsString() @MinLength(1) question!: string;
  @IsString() @MinLength(1) answer!: string;
  @IsOptional() @IsInt() sortOrder?: number;
  @IsOptional() @IsBoolean() isActive?: boolean;
}

export class UpdateFaqDto extends PartialType(CreateFaqDto) {}
