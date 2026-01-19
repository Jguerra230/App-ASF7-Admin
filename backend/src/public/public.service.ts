import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PublicService {
  constructor(private readonly prisma: PrismaService) {}

  async getHome() {
    const [news, banners, championships] = await Promise.all([
      this.prisma.news.findMany({
        where: { published: true, archived: false },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
      this.prisma.banner.findMany({
        where: { active: true },
        orderBy: { order: 'asc' },
      }),
      this.prisma.championship.findMany({
        where: { status: 'ACTIVE' },
      }),
    ]);

    return { news, banners, championships };
  }

  listNews() {
    return this.prisma.news.findMany({
      where: { published: true, archived: false },
      orderBy: { createdAt: 'desc' },
    });
  }

  listBanners() {
    return this.prisma.banner.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });
  }

  listChampionships() {
    return this.prisma.championship.findMany({ include: { teams: true } });
  }

  listMatches() {
    return this.prisma.match.findMany({
      include: {
        homeTeam: true,
        awayTeam: true,
        round: true,
      },
    });
  }

  async getFantasy() {
    const [config, prices, scores] = await Promise.all([
      this.prisma.fantasyConfig.findFirst(),
      this.prisma.fantasyPrice.findMany({ include: { player: true } }),
      this.prisma.fantasyScore.findMany(),
    ]);

    return { config, prices, scores };
  }
}
