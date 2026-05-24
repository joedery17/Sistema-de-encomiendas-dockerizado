import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EntregaService } from './entrega.service';
import { CreateEntregaDto } from './dto/create-entrega.dto';
import { UpdateEntregaDto } from './dto/update-entrega.dto';

@ApiTags('entrega')
@Controller('entrega')
export class EntregaController {
  constructor(private readonly service: EntregaService) {}

  @Post()
  create(@Body() createDto: CreateEntregaDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateEntregaDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
