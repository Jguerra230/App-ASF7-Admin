import { Controller, Get } from '@nestjs/common';
import { PublicService } from './public.service';

@Controller()
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('home')
  getHome() {
    return this.publicService.getHome();
  }

  @Get('news')
  listNews() {
    return this.publicService.listNews();
  }

  @Get('banners')
  listBanners() {
    return this.publicService.listBanners();
  }

  @Get('championships')
  listChampionships() {
    return this.publicService.listChampionships();
  }

  @Get('matches')
  listMatches() {
    return this.publicService.listMatches();
  }

  @Get('fantasy')
  getFantasy() {
    return this.publicService.getFantasy();
  }
}
