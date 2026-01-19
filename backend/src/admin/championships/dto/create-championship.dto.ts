import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ChampionshipFormat, ChampionshipStatus } from '@prisma/client';

export class CreateChampionshipDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  season: string;

  @IsOptional()
  @IsEnum(ChampionshipStatus)
  status?: ChampionshipStatus;

  @IsEnum(ChampionshipFormat)
  format: ChampionshipFormat;

  @IsOptional()
  @IsInt()
  groupsNumber?: number;

  @IsOptional()
  @IsInt()
  qualifiersNumber?: number;
}
