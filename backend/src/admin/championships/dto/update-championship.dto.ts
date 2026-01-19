import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { ChampionshipFormat, ChampionshipStatus } from '@prisma/client';

export class UpdateChampionshipDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  season?: string;

  @IsOptional()
  @IsEnum(ChampionshipStatus)
  status?: ChampionshipStatus;

  @IsOptional()
  @IsEnum(ChampionshipFormat)
  format?: ChampionshipFormat;

  @IsOptional()
  @IsInt()
  groupsNumber?: number;

  @IsOptional()
  @IsInt()
  qualifiersNumber?: number;
}
