import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateNewsDto, images: string[]) {
    return this.prisma.news.create({
      data: {
        ...dto,
        images,
      },
    });
  }

  findAll(currentWeek?: boolean) {
    const where = currentWeek
      ? {
          createdAt: {
            gte: this.getStartOfWeek(),
          },
        }
      : {};

    return this.prisma.news.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.news.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateNewsDto, images?: string[]) {
    return this.prisma.news.update({
      where: { id },
      data: {
        ...dto,
        ...(images ? { images } : {}),
      },
    });
  }

  remove(id: string) {
    return this.prisma.news.delete({ where: { id } });
  }

  private getStartOfWeek() {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(now.getFullYear(), now.getMonth(), diff, 0, 0, 0);
  }
}
