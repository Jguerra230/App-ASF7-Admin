import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MatchStatus } from '@prisma/client';

export class CreateMatchDto {
  @IsString()
  @IsNotEmpty()
  roundId: string;

  @IsString()
  @IsNotEmpty()
  homeTeamId: string;

  @IsString()
  @IsNotEmpty()
  awayTeamId: string;

  @IsOptional()
  @IsEnum(MatchStatus)
  status?: MatchStatus;

  @IsOptional()
  @IsDateString()
  scheduledAt?: string;
}
