import { IsInt, IsOptional } from 'class-validator';

export class UpdateMatchStatsDto {
  @IsOptional()
  @IsInt()
  goals?: number;

  @IsOptional()
  @IsInt()
  assists?: number;

  @IsOptional()
  @IsInt()
  yellowCards?: number;

  @IsOptional()
  @IsInt()
  redCards?: number;

  @IsOptional()
  @IsInt()
  saves?: number;

  @IsOptional()
  @IsInt()
  fouls?: number;

  @IsOptional()
  @IsInt()
  shotsOnTarget?: number;

  @IsOptional()
  @IsInt()
  shotsOnPost?: number;
}
