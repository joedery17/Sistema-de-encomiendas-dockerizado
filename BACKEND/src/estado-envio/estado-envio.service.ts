import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoEnvio } from './estado-envio.entity';
import { CreateEstadoEnvioDto } from './dto/create-estado-envio.dto';
import { UpdateEstadoEnvioDto } from './dto/update-estado-envio.dto';

@Injectable()
export class EstadoEnvioService {
  constructor(
    @InjectRepository(EstadoEnvio)
    private readonly repository: Repository<EstadoEnvio>,
  ) {}

  create(createDto: CreateEstadoEnvioDto) {
    const entity = this.repository.create(createDto as any);
    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const entity = await this.repository.findOne({ where: { id } as any });
    if (!entity) throw new NotFoundException('EstadoEnvio no encontrado');
    return entity;
  }

  async update(id: number, updateDto: UpdateEstadoEnvioDto) {
    await this.findOne(id);
    await this.repository.update(id as any, updateDto as any);
    return this.findOne(id);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repository.remove(entity as any);
    return { message: 'EstadoEnvio eliminado correctamente' };
  }
}
