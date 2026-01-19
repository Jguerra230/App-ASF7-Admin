import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMatchStatsDto {
  @IsString()
  @IsNotEmpty()
  matchId: string;

  @IsString()
  @IsNotEmpty()
  playerId: string;

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
