import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FantasyConfigDto } from './dto/fantasy-config.dto';
import { FantasyPriceDto } from './dto/fantasy-price.dto';
import { FantasyScoreDto } from './dto/fantasy-score.dto';

@Injectable()
export class FantasyService {
  constructor(private readonly prisma: PrismaService) {}

  async getConfig() {
    return this.prisma.fantasyConfig.findFirst();
  }

  async upsertConfig(dto: FantasyConfigDto) {
    const existing = await this.prisma.fantasyConfig.findFirst();
    if (existing) {
      return this.prisma.fantasyConfig.update({
        where: { id: existing.id },
        data: dto,
      });
    }
    return this.prisma.fantasyConfig.create({ data: dto });
  }

  upsertPrice(dto: FantasyPriceDto) {
    return this.prisma.fantasyPrice.upsert({
      where: { playerId: dto.playerId },
      update: { price: dto.price },
      create: dto,
    });
  }

  listPrices() {
    return this.prisma.fantasyPrice.findMany({ include: { player: true } });
  }

  upsertScore(dto: FantasyScoreDto) {
    return this.prisma.fantasyScore.upsert({
      where: { action: dto.action },
      update: { points: dto.points },
      create: dto,
    });
  }

  listScores() {
    return this.prisma.fantasyScore.findMany();
  }
}
