import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateRoundDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  number?: number;

  @IsOptional()
  @IsString()
  championshipId?: string;
}
