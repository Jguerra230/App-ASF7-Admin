import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Role } from '@prisma/client';
import { Roles } from '../../common/roles.decorator';
import { RolesGuard } from '../../common/roles.guard';
import { JwtAuthGuard } from '../../common/jwt-auth.guard';
import { storage } from '../../uploads/upload.config';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsService } from './news.service';

@Controller('admin/news')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images', 10, { storage }))
  create(
    @Body() dto: CreateNewsDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const images = files?.map((file) => `/uploads/${file.filename}`) ?? [];
    return this.newsService.create(dto, images);
  }

  @Get()
  findAll(@Query('currentWeek') currentWeek?: string) {
    return this.newsService.findAll(currentWeek === 'true');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images', 10, { storage }))
  update(
    @Param('id') id: string,
    @Body() dto: UpdateNewsDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const images = files?.length
      ? files.map((file) => `/uploads/${file.filename}`)
      : undefined;
    return this.newsService.update(id, dto, images);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
}
