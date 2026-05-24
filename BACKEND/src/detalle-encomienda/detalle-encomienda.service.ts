import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleEncomienda } from './detalle-encomienda.entity';
import { CreateDetalleEncomiendaDto } from './dto/create-detalle-encomienda.dto';
import { UpdateDetalleEncomiendaDto } from './dto/update-detalle-encomienda.dto';

@Injectable()
export class DetalleEncomiendaService {
  constructor(
    @InjectRepository(DetalleEncomienda)
    private readonly repository: Repository<DetalleEncomienda>,
  ) {}

  create(createDto: CreateDetalleEncomiendaDto) {
    const entity = this.repository.create(createDto as any);
    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const entity = await this.repository.findOne({ where: { id } as any });
    if (!entity) throw new NotFoundException('DetalleEncomienda no encontrado');
    return entity;
  }

  async update(id: number, updateDto: UpdateDetalleEncomiendaDto) {
    await this.findOne(id);
    await this.repository.update(id as any, updateDto as any);
    return this.findOne(id);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repository.remove(entity as any);
    return { message: 'DetalleEncomienda eliminado correctamente' };
  }
}
