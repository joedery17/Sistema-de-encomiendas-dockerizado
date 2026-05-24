import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, CreateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Encomienda } from '../encomienda/encomienda.entity';

@Entity('seguro')
export class Seguro {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiPropertyOptional()
  @Column({ name: 'encomienda_id', type: 'int', unique: true, nullable: true })
  encomiendaId?: number;

  @ApiPropertyOptional()
  @Column({ name: 'monto', type: 'decimal', precision: 10, scale: 2, nullable: true })
  monto?: number;

  @ApiPropertyOptional()
  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion?: string;

  @OneToOne(() => Encomienda, { eager: false, nullable: true })
  @JoinColumn({ name: 'encomienda_id' })
  encomienda?: Encomienda;

}
