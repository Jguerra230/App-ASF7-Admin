import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../../common/jwt-auth.guard';
import { Roles } from '../../common/roles.decorator';
import { RolesGuard } from '../../common/roles.guard';
import { CreateMatchStatsDto } from './dto/create-match-stats.dto';
import { UpdateMatchStatsDto } from './dto/update-match-stats.dto';
import { MatchStatsService } from './match-stats.service';

@Controller('admin/match-stats')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class MatchStatsController {
  constructor(private readonly matchStatsService: MatchStatsService) {}

  @Post()
  create(@Body() dto: CreateMatchStatsDto) {
    return this.matchStatsService.create(dto);
  }

  @Get()
  findAll() {
    return this.matchStatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matchStatsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMatchStatsDto) {
    return this.matchStatsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matchStatsService.remove(id);
  }
}
