import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactoCliente } from './contacto-cliente.entity';
import { CreateContactoClienteDto } from './dto/create-contacto-cliente.dto';
import { UpdateContactoClienteDto } from './dto/update-contacto-cliente.dto';

@Injectable()
export class ContactoClienteService {
  constructor(
    @InjectRepository(ContactoCliente)
    private readonly repository: Repository<ContactoCliente>,
  ) {}

  create(createDto: CreateContactoClienteDto) {
    const entity = this.repository.create(createDto as any);
    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const entity = await this.repository.findOne({ where: { id } as any });
    if (!entity) throw new NotFoundException('ContactoCliente no encontrado');
    return entity;
  }

  async update(id: number, updateDto: UpdateContactoClienteDto) {
    await this.findOne(id);
    await this.repository.update(id as any, updateDto as any);
    return this.findOne(id);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repository.remove(entity as any);
    return { message: 'ContactoCliente eliminado correctamente' };
  }
}
