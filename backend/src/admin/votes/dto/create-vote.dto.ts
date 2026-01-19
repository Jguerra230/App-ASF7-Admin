import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { VoteType } from '@prisma/client';

export class CreateVoteDto {
  @IsEnum(VoteType)
  type: VoteType;

  @IsString()
  @IsNotEmpty()
  playerId: string;
}
