import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdatePollDto {
  @IsOptional()
  @IsString()
  question?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
