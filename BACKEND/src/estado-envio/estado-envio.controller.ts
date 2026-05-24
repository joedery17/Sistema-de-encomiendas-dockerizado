import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EstadoEnvioService } from './estado-envio.service';
import { CreateEstadoEnvioDto } from './dto/create-estado-envio.dto';
import { UpdateEstadoEnvioDto } from './dto/update-estado-envio.dto';

@ApiTags('estado_envio')
@Controller('estado_envio')
export class EstadoEnvioController {
  constructor(private readonly service: EstadoEnvioService) {}

  @Post()
  create(@Body() createDto: CreateEstadoEnvioDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateEstadoEnvioDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
