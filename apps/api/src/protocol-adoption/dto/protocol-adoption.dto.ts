import { IsInt, Max, Min } from 'class-validator';

export class UpdateProtocolAdoptionDto {
  @IsInt() @Min(0) @Max(100) ipv4SharePercent!: number;
  @IsInt() @Min(0) @Max(100) ipv6SharePercent!: number;
}
