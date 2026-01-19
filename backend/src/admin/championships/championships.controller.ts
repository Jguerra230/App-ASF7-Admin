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
import { ChampionshipsService } from './championships.service';
import { CreateChampionshipDto } from './dto/create-championship.dto';
import { UpdateChampionshipDto } from './dto/update-championship.dto';

@Controller('admin/championships')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class ChampionshipsController {
  constructor(private readonly championshipsService: ChampionshipsService) {}

  @Post()
  create(@Body() dto: CreateChampionshipDto) {
    return this.championshipsService.create(dto);
  }

  @Get()
  findAll() {
    return this.championshipsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.championshipsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateChampionshipDto) {
    return this.championshipsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.championshipsService.remove(id);
  }
}
