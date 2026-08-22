import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTimelineEntryDto {
  @IsString() @MinLength(1) year!: string;
  @IsString() @MinLength(1) title!: string;
  @IsString() @MinLength(1) description!: string;
  @IsOptional() @IsInt() sortOrder?: number;
}

export class UpdateTimelineEntryDto extends PartialType(CreateTimelineEntryDto) {}
