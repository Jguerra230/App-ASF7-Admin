import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../../common/jwt-auth.guard';
import { Roles } from '../../common/roles.decorator';
import { RolesGuard } from '../../common/roles.guard';
import { FantasyConfigDto } from './dto/fantasy-config.dto';
import { FantasyPriceDto } from './dto/fantasy-price.dto';
import { FantasyScoreDto } from './dto/fantasy-score.dto';
import { FantasyService } from './fantasy.service';

@Controller('admin/fantasy')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class FantasyController {
  constructor(private readonly fantasyService: FantasyService) {}

  @Get('config')
  getConfig() {
    return this.fantasyService.getConfig();
  }

  @Post('config')
  upsertConfig(@Body() dto: FantasyConfigDto) {
    return this.fantasyService.upsertConfig(dto);
  }

  @Get('prices')
  listPrices() {
    return this.fantasyService.listPrices();
  }

  @Post('prices')
  upsertPrice(@Body() dto: FantasyPriceDto) {
    return this.fantasyService.upsertPrice(dto);
  }

  @Get('scoring')
  listScores() {
    return this.fantasyService.listScores();
  }

  @Post('scoring')
  upsertScore(@Body() dto: FantasyScoreDto) {
    return this.fantasyService.upsertScore(dto);
  }
}
