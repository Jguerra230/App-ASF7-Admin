import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PlayerPosition } from '@prisma/client';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(PlayerPosition)
  position: PlayerPosition;

  @IsString()
  @IsNotEmpty()
  teamId: string;
}
