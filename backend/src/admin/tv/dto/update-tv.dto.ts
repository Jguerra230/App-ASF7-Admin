import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateTvDto {
  @IsOptional()
  @IsString()
  youtubeChannelUrl?: string;

  @IsOptional()
  @IsString()
  liveUrl?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  playlists?: string[];
}
