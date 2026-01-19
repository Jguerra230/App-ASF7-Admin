import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTvDto {
  @IsString()
  @IsNotEmpty()
  youtubeChannelUrl: string;

  @IsOptional()
  @IsString()
  liveUrl?: string;

  @IsArray()
  @IsString({ each: true })
  playlists: string[];
}
