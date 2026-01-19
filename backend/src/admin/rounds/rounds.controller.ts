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
import { CreateRoundDto } from './dto/create-round.dto';
import { UpdateRoundDto } from './dto/update-round.dto';
import { RoundsService } from './rounds.service';

@Controller('admin/rounds')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class RoundsController {
  constructor(private readonly roundsService: RoundsService) {}

  @Post()
  create(@Body() dto: CreateRoundDto) {
    return this.roundsService.create(dto);
  }

  @Get()
  findAll() {
    return this.roundsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roundsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRoundDto) {
    return this.roundsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roundsService.remove(id);
  }
}
