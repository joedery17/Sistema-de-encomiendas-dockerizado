import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SeguimientoService } from './seguimiento.service';
import { CreateSeguimientoDto } from './dto/create-seguimiento.dto';
import { UpdateSeguimientoDto } from './dto/update-seguimiento.dto';

@ApiTags('seguimiento')
@Controller('seguimiento')
export class SeguimientoController {
  constructor(private readonly service: SeguimientoService) {}

  @Post()
  create(@Body() createDto: CreateSeguimientoDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateSeguimientoDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
