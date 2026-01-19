import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';

@Injectable()
export class PollsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreatePollDto) {
    return this.prisma.poll.create({
      data: {
        question: dto.question,
        isActive: dto.isActive ?? true,
        options: {
          create: dto.options.map((text) => ({ text })),
        },
      },
      include: { options: true },
    });
  }

  findAll() {
    return this.prisma.poll.findMany({ include: { options: true } });
  }

  findOne(id: string) {
    return this.prisma.poll.findUnique({
      where: { id },
      include: { options: true },
    });
  }

  update(id: string, dto: UpdatePollDto) {
    return this.prisma.poll.update({
      where: { id },
      data: dto,
      include: { options: true },
    });
  }

  remove(id: string) {
    return this.prisma.poll.delete({ where: { id } });
  }
}
