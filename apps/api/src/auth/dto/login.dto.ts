import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  /** Either the account's username or its email address. */
  @IsString()
  @MinLength(1)
  identifier!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}
