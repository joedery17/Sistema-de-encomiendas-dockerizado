import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, CreateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Encomienda } from '../encomienda/encomienda.entity';
import { TipoPaquete } from '../tipo-paquete/tipo-paquete.entity';

@Entity('detalle_encomienda')
export class DetalleEncomienda {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiPropertyOptional()
  @Column({ name: 'encomienda_id', type: 'int', nullable: true })
  encomiendaId?: number;

  @ApiPropertyOptional()
  @Column({ name: 'tipo_id', type: 'int', nullable: true })
  tipoId?: number;

  @ApiPropertyOptional()
  @Column({ name: 'cantidad', type: 'int', nullable: true })
  cantidad?: number;

  @ApiPropertyOptional()
  @Column({ name: 'observaciones', type: 'text', nullable: true })
  observaciones?: string;

  @ManyToOne(() => Encomienda, { eager: false, nullable: true })
  @JoinColumn({ name: 'encomienda_id' })
  encomienda?: Encomienda;

  @ManyToOne(() => TipoPaquete, { eager: false, nullable: true })
  @JoinColumn({ name: 'tipo_id' })
  tipo?: TipoPaquete;

}
