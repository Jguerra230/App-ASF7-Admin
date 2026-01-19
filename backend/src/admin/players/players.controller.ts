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
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayersService } from './players.service';

@Controller('admin/players')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo', { storage }))
  create(
    @Body() dto: CreatePlayerDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const photoUrl = file ? `/uploads/${file.filename}` : undefined;
    return this.playersService.create(dto, photoUrl);
  }

  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('photo', { storage }))
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePlayerDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const photoUrl = file ? `/uploads/${file.filename}` : undefined;
    return this.playersService.update(id, dto, photoUrl);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playersService.remove(id);
  }
}
