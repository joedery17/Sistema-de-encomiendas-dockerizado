import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TipoPaqueteService } from './tipo-paquete.service';
import { CreateTipoPaqueteDto } from './dto/create-tipo-paquete.dto';
import { UpdateTipoPaqueteDto } from './dto/update-tipo-paquete.dto';

@ApiTags('tipo_paquete')
@Controller('tipo_paquete')
export class TipoPaqueteController {
  constructor(private readonly service: TipoPaqueteService) {}

  @Post()
  create(@Body() createDto: CreateTipoPaqueteDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateTipoPaqueteDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
