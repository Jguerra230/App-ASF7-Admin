import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from '@prisma/client';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  role?: Role;
}
