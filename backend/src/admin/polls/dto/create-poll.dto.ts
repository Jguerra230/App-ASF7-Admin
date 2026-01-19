import { ArrayMinSize, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePollDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ArrayMinSize(2)
  @IsString({ each: true })
  options: string[];
}
