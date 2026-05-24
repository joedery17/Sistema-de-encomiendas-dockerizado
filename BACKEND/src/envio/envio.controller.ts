import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EnvioService } from './envio.service';
import { CreateEnvioDto } from './dto/create-envio.dto';
import { UpdateEnvioDto } from './dto/update-envio.dto';

@ApiTags('envio')
@Controller('envio')
export class EnvioController {
  constructor(private readonly service: EnvioService) {}

  @Post()
  create(@Body() createDto: CreateEnvioDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateEnvioDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
