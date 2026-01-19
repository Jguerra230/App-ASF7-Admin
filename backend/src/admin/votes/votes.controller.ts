import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../../common/jwt-auth.guard';
import { Roles } from '../../common/roles.decorator';
import { RolesGuard } from '../../common/roles.guard';
import { CreateVoteDto } from './dto/create-vote.dto';
import { VotesService } from './votes.service';

@Controller('admin/votes')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  create(@Body() dto: CreateVoteDto) {
    return this.votesService.create(dto);
  }

  @Get()
  findAll() {
    return this.votesService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.votesService.remove(id);
  }
}
