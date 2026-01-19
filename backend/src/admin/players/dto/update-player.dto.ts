import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PlayerPosition } from '@prisma/client';

export class UpdatePlayerDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(PlayerPosition)
  position?: PlayerPosition;

  @IsOptional()
  @IsString()
  teamId?: string;
}
