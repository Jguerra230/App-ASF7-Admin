import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRoundDto } from './dto/create-round.dto';
import { UpdateRoundDto } from './dto/update-round.dto';

@Injectable()
export class RoundsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateRoundDto) {
    return this.prisma.round.create({ data: dto });
  }

  findAll() {
    return this.prisma.round.findMany({ include: { matches: true } });
  }

  findOne(id: string) {
    return this.prisma.round.findUnique({
      where: { id },
      include: { matches: true },
    });
  }

  update(id: string, dto: UpdateRoundDto) {
    return this.prisma.round.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.round.delete({ where: { id } });
  }
}
