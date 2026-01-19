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
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { PollsService } from './polls.service';

@Controller('admin/polls')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Post()
  create(@Body() dto: CreatePollDto) {
    return this.pollsService.create(dto);
  }

  @Get()
  findAll() {
    return this.pollsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pollsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePollDto) {
    return this.pollsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pollsService.remove(id);
  }
}
