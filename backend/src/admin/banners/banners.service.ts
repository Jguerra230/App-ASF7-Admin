import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@Injectable()
export class BannersService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateBannerDto, imageUrl: string) {
    return this.prisma.banner.create({
      data: {
        ...dto,
        imageUrl,
        startAt: dto.startAt ? new Date(dto.startAt) : null,
        endAt: dto.endAt ? new Date(dto.endAt) : null,
      },
    });
  }

  findAll() {
    return this.prisma.banner.findMany({ orderBy: { order: 'asc' } });
  }

  findOne(id: string) {
    return this.prisma.banner.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateBannerDto, imageUrl?: string) {
    return this.prisma.banner.update({
      where: { id },
      data: {
        ...dto,
        ...(imageUrl ? { imageUrl } : {}),
        startAt: dto.startAt ? new Date(dto.startAt) : undefined,
        endAt: dto.endAt ? new Date(dto.endAt) : undefined,
      },
    });
  }

  remove(id: string) {
    return this.prisma.banner.delete({ where: { id } });
  }
}
