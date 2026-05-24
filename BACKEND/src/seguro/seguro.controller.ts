import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SeguroService } from './seguro.service';
import { CreateSeguroDto } from './dto/create-seguro.dto';
import { UpdateSeguroDto } from './dto/update-seguro.dto';

@ApiTags('seguro')
@Controller('seguro')
export class SeguroController {
  constructor(private readonly service: SeguroService) {}

  @Post()
  create(@Body() createDto: CreateSeguroDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateSeguroDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
