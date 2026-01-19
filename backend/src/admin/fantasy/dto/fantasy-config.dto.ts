import { IsInt, IsOptional } from 'class-validator';

export class FantasyConfigDto {
  @IsOptional()
  @IsInt()
  initialBudget?: number;

  @IsOptional()
  @IsInt()
  gkCount?: number;

  @IsOptional()
  @IsInt()
  defCount?: number;

  @IsOptional()
  @IsInt()
  midCount?: number;

  @IsOptional()
  @IsInt()
  ataCount?: number;
}
