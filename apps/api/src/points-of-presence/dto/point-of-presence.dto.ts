import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePointOfPresenceDto {
  @IsString() @MinLength(1) name!: string;
  @IsString() @MinLength(1) city!: string;
  @IsString() @MinLength(1) description!: string;
  @IsOptional() @IsInt() sortOrder?: number;
  @IsOptional() @IsBoolean() isActive?: boolean;
}

export class UpdatePointOfPresenceDto extends PartialType(CreatePointOfPresenceDto) {}
