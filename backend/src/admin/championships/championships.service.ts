import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateChampionshipDto } from './dto/create-championship.dto';
import { UpdateChampionshipDto } from './dto/update-championship.dto';

@Injectable()
export class ChampionshipsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateChampionshipDto) {
    return this.prisma.championship.create({ data: dto });
  }

  findAll() {
    return this.prisma.championship.findMany({ include: { teams: true } });
  }

  findOne(id: string) {
    return this.prisma.championship.findUnique({
      where: { id },
      include: { teams: true },
    });
  }

  update(id: string, dto: UpdateChampionshipDto) {
    return this.prisma.championship.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.championship.delete({ where: { id } });
  }
}
