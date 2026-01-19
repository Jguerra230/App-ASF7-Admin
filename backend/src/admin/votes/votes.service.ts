import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateVoteDto } from './dto/create-vote.dto';

@Injectable()
export class VotesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateVoteDto) {
    return this.prisma.vote.create({ data: dto });
  }

  findAll() {
    return this.prisma.vote.findMany({ include: { player: true } });
  }

  remove(id: string) {
    return this.prisma.vote.delete({ where: { id } });
  }
}
