import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class FantasyPriceDto {
  @IsString()
  @IsNotEmpty()
  playerId: string;

  @IsInt()
  price: number;
}
