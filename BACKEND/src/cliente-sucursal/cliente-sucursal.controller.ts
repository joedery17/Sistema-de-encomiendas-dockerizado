import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClienteSucursalService } from './cliente-sucursal.service';
import { CreateClienteSucursalDto } from './dto/create-cliente-sucursal.dto';
import { UpdateClienteSucursalDto } from './dto/update-cliente-sucursal.dto';

@ApiTags('cliente_sucursal')
@Controller('cliente_sucursal')
export class ClienteSucursalController {
  constructor(private readonly service: ClienteSucursalService) {}

  @Post()
  create(@Body() createDto: CreateClienteSucursalDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':clienteId/:sucursalId')
  findOne(
    @Param('clienteId', ParseIntPipe) clienteId: number,
    @Param('sucursalId', ParseIntPipe) sucursalId: number,
  ) {
    return this.service.findOne(clienteId, sucursalId);
  }

  @Patch(':clienteId/:sucursalId')
  update(
    @Param('clienteId', ParseIntPipe) clienteId: number,
    @Param('sucursalId', ParseIntPipe) sucursalId: number,
    @Body() updateDto: UpdateClienteSucursalDto,
  ) {
    return this.service.update(clienteId, sucursalId, updateDto);
  }

  @Delete(':clienteId/:sucursalId')
  remove(
    @Param('clienteId', ParseIntPipe) clienteId: number,
    @Param('sucursalId', ParseIntPipe) sucursalId: number,
  ) {
    return this.service.remove(clienteId, sucursalId);
  }
}
