import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../../common/jwt-auth.guard';
import { Roles } from '../../common/roles.decorator';
import { RolesGuard } from '../../common/roles.guard';
import { storage } from '../../uploads/upload.config';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamsService } from './teams.service';

@Controller('admin/teams')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('crest', { storage }))
  create(
    @Body() dto: CreateTeamDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const crestUrl = file ? `/uploads/${file.filename}` : undefined;
    return this.teamsService.create(dto, crestUrl);
  }

  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('crest', { storage }))
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTeamDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const crestUrl = file ? `/uploads/${file.filename}` : undefined;
    return this.teamsService.update(id, dto, crestUrl);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(id);
  }
}
