import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seguimiento } from './seguimiento.entity';
import { CreateSeguimientoDto } from './dto/create-seguimiento.dto';
import { UpdateSeguimientoDto } from './dto/update-seguimiento.dto';

@Injectable()
export class SeguimientoService {
  constructor(
    @InjectRepository(Seguimiento)
    private readonly repository: Repository<Seguimiento>,
  ) {}

  create(createDto: CreateSeguimientoDto) {
    const entity = this.repository.create(createDto as any);
    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const entity = await this.repository.findOne({ where: { id } as any });
    if (!entity) throw new NotFoundException('Seguimiento no encontrado');
    return entity;
  }

  async update(id: number, updateDto: UpdateSeguimientoDto) {
    await this.findOne(id);
    await this.repository.update(id as any, updateDto as any);
    return this.findOne(id);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repository.remove(entity as any);
    return { message: 'Seguimiento eliminado correctamente' };
  }
}
