import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Injectable()
export class PlayersService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreatePlayerDto, photoUrl?: string) {
    return this.prisma.player.create({
      data: {
        ...dto,
        photoUrl,
      },
    });
  }

  findAll() {
    return this.prisma.player.findMany({ include: { team: true } });
  }

  findOne(id: string) {
    return this.prisma.player.findUnique({
      where: { id },
      include: { team: true },
    });
  }

  update(id: string, dto: UpdatePlayerDto, photoUrl?: string) {
    return this.prisma.player.update({
      where: { id },
      data: {
        ...dto,
        ...(photoUrl ? { photoUrl } : {}),
      },
    });
  }

  remove(id: string) {
    return this.prisma.player.delete({ where: { id } });
  }
}
