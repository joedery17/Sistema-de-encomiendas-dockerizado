import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seguro } from './seguro.entity';
import { CreateSeguroDto } from './dto/create-seguro.dto';
import { UpdateSeguroDto } from './dto/update-seguro.dto';

@Injectable()
export class SeguroService {
  constructor(
    @InjectRepository(Seguro)
    private readonly repository: Repository<Seguro>,
  ) {}

  create(createDto: CreateSeguroDto) {
    const entity = this.repository.create(createDto as any);
    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const entity = await this.repository.findOne({ where: { id } as any });
    if (!entity) throw new NotFoundException('Seguro no encontrado');
    return entity;
  }

  async update(id: number, updateDto: UpdateSeguroDto) {
    await this.findOne(id);
    await this.repository.update(id as any, updateDto as any);
    return this.findOne(id);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repository.remove(entity as any);
    return { message: 'Seguro eliminado correctamente' };
  }
}
