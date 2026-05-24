import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContactoClienteService } from './contacto-cliente.service';
import { CreateContactoClienteDto } from './dto/create-contacto-cliente.dto';
import { UpdateContactoClienteDto } from './dto/update-contacto-cliente.dto';

@ApiTags('contacto_cliente')
@Controller('contacto_cliente')
export class ContactoClienteController {
  constructor(private readonly service: ContactoClienteService) {}

  @Post()
  create(@Body() createDto: CreateContactoClienteDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateContactoClienteDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
