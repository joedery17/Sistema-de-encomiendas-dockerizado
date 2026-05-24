import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoPaquete } from './tipo-paquete.entity';
import { CreateTipoPaqueteDto } from './dto/create-tipo-paquete.dto';
import { UpdateTipoPaqueteDto } from './dto/update-tipo-paquete.dto';

@Injectable()
export class TipoPaqueteService {
  constructor(
    @InjectRepository(TipoPaquete)
    private readonly repository: Repository<TipoPaquete>,
  ) {}

  create(createDto: CreateTipoPaqueteDto) {
    const entity = this.repository.create(createDto as any);
    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const entity = await this.repository.findOne({ where: { id } as any });
    if (!entity) throw new NotFoundException('TipoPaquete no encontrado');
    return entity;
  }

  async update(id: number, updateDto: UpdateTipoPaqueteDto) {
    await this.findOne(id);
    await this.repository.update(id as any, updateDto as any);
    return this.findOne(id);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repository.remove(entity as any);
    return { message: 'TipoPaquete eliminado correctamente' };
  }
}
