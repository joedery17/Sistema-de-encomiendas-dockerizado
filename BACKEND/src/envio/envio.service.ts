import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Envio } from './envio.entity';
import { CreateEnvioDto } from './dto/create-envio.dto';
import { UpdateEnvioDto } from './dto/update-envio.dto';

@Injectable()
export class EnvioService {
  constructor(
    @InjectRepository(Envio)
    private readonly repository: Repository<Envio>,
  ) {}

  create(createDto: CreateEnvioDto) {
    const entity = this.repository.create(createDto as any);
    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const entity = await this.repository.findOne({ where: { id } as any });
    if (!entity) throw new NotFoundException('Envio no encontrado');
    return entity;
  }

  async update(id: number, updateDto: UpdateEnvioDto) {
    await this.findOne(id);
    await this.repository.update(id as any, updateDto as any);
    return this.findOne(id);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repository.remove(entity as any);
    return { message: 'Envio eliminado correctamente' };
  }
}
