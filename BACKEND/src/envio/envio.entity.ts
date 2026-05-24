import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, CreateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Encomienda } from '../encomienda/encomienda.entity';
import { Sucursal } from '../sucursal/sucursal.entity';
import { EstadoEnvio } from '../estado-envio/estado-envio.entity';

@Entity('envio')
export class Envio {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiPropertyOptional()
  @Column({ name: 'encomienda_id', type: 'int', unique: true, nullable: true })
  encomiendaId?: number;

  @ApiPropertyOptional()
  @Column({ name: 'sucursal_origen_id', type: 'int', nullable: true })
  sucursalOrigenId?: number;

  @ApiPropertyOptional()
  @Column({ name: 'sucursal_destino_id', type: 'int', nullable: true })
  sucursalDestinoId?: number;

  @ApiPropertyOptional()
  @Column({ name: 'fecha_envio', type: 'timestamp', nullable: true })
  fechaEnvio?: Date;

  @ApiPropertyOptional()
  @Column({ name: 'fecha_estimada', type: 'timestamp', nullable: true })
  fechaEstimada?: Date;

  @ApiPropertyOptional()
  @Column({ name: 'costo', type: 'decimal', precision: 10, scale: 2, nullable: true })
  costo?: number;

  @ApiPropertyOptional()
  @Column({ name: 'estado_id', type: 'int', nullable: true })
  estadoId?: number;

  @OneToOne(() => Encomienda, { eager: false, nullable: true })
  @JoinColumn({ name: 'encomienda_id' })
  encomienda?: Encomienda;

  @ManyToOne(() => Sucursal, { eager: false, nullable: true })
  @JoinColumn({ name: 'sucursal_origen_id' })
  sucursalOrigen?: Sucursal;

  @ManyToOne(() => Sucursal, { eager: false, nullable: true })
  @JoinColumn({ name: 'sucursal_destino_id' })
  sucursalDestino?: Sucursal;

  @ManyToOne(() => EstadoEnvio, { eager: false, nullable: true })
  @JoinColumn({ name: 'estado_id' })
  estado?: EstadoEnvio;

}
