import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMatchStatsDto } from './dto/create-match-stats.dto';
import { UpdateMatchStatsDto } from './dto/update-match-stats.dto';

@Injectable()
export class MatchStatsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateMatchStatsDto) {
    return this.prisma.matchStats.create({ data: dto });
  }

  findAll() {
    return this.prisma.matchStats.findMany({
      include: { match: true, player: true },
    });
  }

  findOne(id: string) {
    return this.prisma.matchStats.findUnique({
      where: { id },
      include: { match: true, player: true },
    });
  }

  update(id: string, dto: UpdateMatchStatsDto) {
    return this.prisma.matchStats.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.matchStats.delete({ where: { id } });
  }
}
