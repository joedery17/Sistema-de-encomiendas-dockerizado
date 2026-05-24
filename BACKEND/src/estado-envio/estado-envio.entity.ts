import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, CreateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity('estado_envio')
export class EstadoEnvio {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiPropertyOptional()
  @Column({ name: 'nombre', nullable: true })
  nombre?: string;

}
