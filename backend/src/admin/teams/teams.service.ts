import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateTeamDto, crestUrl?: string) {
    return this.prisma.team.create({
      data: {
        ...dto,
        crestUrl,
      },
    });
  }

  findAll() {
    return this.prisma.team.findMany({ include: { players: true } });
  }

  findOne(id: string) {
    return this.prisma.team.findUnique({
      where: { id },
      include: { players: true },
    });
  }

  update(id: string, dto: UpdateTeamDto, crestUrl?: string) {
    return this.prisma.team.update({
      where: { id },
      data: {
        ...dto,
        ...(crestUrl ? { crestUrl } : {}),
      },
    });
  }

  remove(id: string) {
    return this.prisma.team.delete({ where: { id } });
  }
}
