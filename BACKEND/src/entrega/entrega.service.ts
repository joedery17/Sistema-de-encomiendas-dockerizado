import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entrega } from './entrega.entity';
import { CreateEntregaDto } from './dto/create-entrega.dto';
import { UpdateEntregaDto } from './dto/update-entrega.dto';

@Injectable()
export class EntregaService {
  constructor(
    @InjectRepository(Entrega)
    private readonly repository: Repository<Entrega>,
  ) {}

  create(createDto: CreateEntregaDto) {
    const entity = this.repository.create(createDto as any);
    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const entity = await this.repository.findOne({ where: { id } as any });
    if (!entity) throw new NotFoundException('Entrega no encontrado');
    return entity;
  }

  async update(id: number, updateDto: UpdateEntregaDto) {
    await this.findOne(id);
    await this.repository.update(id as any, updateDto as any);
    return this.findOne(id);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repository.remove(entity as any);
    return { message: 'Entrega eliminado correctamente' };
  }
}
