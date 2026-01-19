import { IsEnum, IsInt } from 'class-validator';
import { FantasyAction } from '@prisma/client';

export class FantasyScoreDto {
  @IsEnum(FantasyAction)
  action: FantasyAction;

  @IsInt()
  points: number;
}
