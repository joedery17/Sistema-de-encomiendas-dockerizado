import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Encomienda } from './encomienda.entity';
import { CreateEncomiendaDto } from './dto/create-encomienda.dto';
import { UpdateEncomiendaDto } from './dto/update-encomienda.dto';

@Injectable()
export class EncomiendaService {
  constructor(
    @InjectRepository(Encomienda)
    private readonly repository: Repository<Encomienda>,
  ) {}

  create(createDto: CreateEncomiendaDto) {
    const entity = this.repository.create(createDto as any);
    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const entity = await this.repository.findOne({ where: { id } as any });
    if (!entity) throw new NotFoundException('Encomienda no encontrado');
    return entity;
  }

  async update(id: number, updateDto: UpdateEncomiendaDto) {
    await this.findOne(id);
    await this.repository.update(id as any, updateDto as any);
    return this.findOne(id);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repository.remove(entity as any);
    return { message: 'Encomienda eliminado correctamente' };
  }
}
