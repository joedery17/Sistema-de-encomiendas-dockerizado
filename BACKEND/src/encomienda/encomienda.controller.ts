import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EncomiendaService } from './encomienda.service';
import { CreateEncomiendaDto } from './dto/create-encomienda.dto';
import { UpdateEncomiendaDto } from './dto/update-encomienda.dto';

@ApiTags('encomienda')
@Controller('encomienda')
export class EncomiendaController {
  constructor(private readonly service: EncomiendaService) {}

  @Post()
  create(@Body() createDto: CreateEncomiendaDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateEncomiendaDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
