import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../../common/jwt-auth.guard';
import { Roles } from '../../common/roles.decorator';
import { RolesGuard } from '../../common/roles.guard';
import { CreateTvDto } from './dto/create-tv.dto';
import { UpdateTvDto } from './dto/update-tv.dto';
import { TvService } from './tv.service';

@Controller('admin/tv')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class TvController {
  constructor(private readonly tvService: TvService) {}

  @Post()
  create(@Body() dto: CreateTvDto) {
    return this.tvService.create(dto);
  }

  @Get()
  findAll() {
    return this.tvService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTvDto) {
    return this.tvService.update(id, dto);
  }
}
