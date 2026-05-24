import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteSucursal } from './cliente-sucursal.entity';
import { CreateClienteSucursalDto } from './dto/create-cliente-sucursal.dto';
import { UpdateClienteSucursalDto } from './dto/update-cliente-sucursal.dto';

@Injectable()
export class ClienteSucursalService {
  constructor(
    @InjectRepository(ClienteSucursal)
    private readonly repository: Repository<ClienteSucursal>,
  ) {}

  create(createDto: CreateClienteSucursalDto) {
    const entity = this.repository.create(createDto as any);
    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(clienteId: number, sucursalId: number) {
    const entity = await this.repository.findOne({ where: { clienteId, sucursalId } });
    if (!entity) throw new NotFoundException('ClienteSucursal no encontrado');
    return entity;
  }

  async update(clienteId: number, sucursalId: number, updateDto: UpdateClienteSucursalDto) {
    await this.findOne(clienteId, sucursalId);
    await this.repository.update({ clienteId, sucursalId }, updateDto as any);
    return this.findOne(clienteId, sucursalId);
  }

  async remove(clienteId: number, sucursalId: number) {
    const entity = await this.findOne(clienteId, sucursalId);
    await this.repository.remove(entity);
    return { message: 'ClienteSucursal eliminado correctamente' };
  }
}
