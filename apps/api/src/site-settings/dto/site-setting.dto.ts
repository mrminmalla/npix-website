import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpsertSiteSettingDto {
  @IsString() @MinLength(1) value!: string;
  @IsOptional() @IsString() description?: string;
}
