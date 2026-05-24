import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, CreateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity('tipo_paquete')
export class TipoPaquete {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiPropertyOptional()
  @Column({ name: 'nombre', nullable: true })
  nombre?: string;

  @ApiPropertyOptional()
  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion?: string;

}
