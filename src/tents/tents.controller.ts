import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TentsService } from './tents.service';
import { CreateTentDto } from './dto/create-tent.dto';
import { UpdateTentDto } from './dto/update-tent.dto';

@Controller('tents')
export class TentsController {
  constructor(private readonly tentsService: TentsService) {}

  @Post()
  create(@Body() createTentDto: CreateTentDto) {
    return this.tentsService.create(createTentDto);
  }

  @Get()
  findAll() {
    return this.tentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTentDto: UpdateTentDto) {
    return this.tentsService.update(id, updateTentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tentsService.remove(id);
  }
}
