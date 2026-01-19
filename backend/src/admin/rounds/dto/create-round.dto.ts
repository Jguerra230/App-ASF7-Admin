import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoundDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  number: number;

  @IsString()
  @IsNotEmpty()
  championshipId: string;
}
