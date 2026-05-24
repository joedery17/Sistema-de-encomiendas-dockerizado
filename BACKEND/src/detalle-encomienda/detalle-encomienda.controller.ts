import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DetalleEncomiendaService } from './detalle-encomienda.service';
import { CreateDetalleEncomiendaDto } from './dto/create-detalle-encomienda.dto';
import { UpdateDetalleEncomiendaDto } from './dto/update-detalle-encomienda.dto';

@ApiTags('detalle_encomienda')
@Controller('detalle_encomienda')
export class DetalleEncomiendaController {
  constructor(private readonly service: DetalleEncomiendaService) {}

  @Post()
  create(@Body() createDto: CreateDetalleEncomiendaDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateDetalleEncomiendaDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
