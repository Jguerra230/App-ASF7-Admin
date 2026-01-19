import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTvDto } from './dto/create-tv.dto';
import { UpdateTvDto } from './dto/update-tv.dto';

@Injectable()
export class TvService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateTvDto) {
    return this.prisma.tvConfig.create({ data: dto });
  }

  findAll() {
    return this.prisma.tvConfig.findMany();
  }

  update(id: string, dto: UpdateTvDto) {
    return this.prisma.tvConfig.update({ where: { id }, data: dto });
  }
}
