import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, CreateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Envio } from '../envio/envio.entity';
import { EstadoEnvio } from '../estado-envio/estado-envio.entity';

@Entity('seguimiento')
export class Seguimiento {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiPropertyOptional()
  @Column({ name: 'envio_id', type: 'int', nullable: true })
  envioId?: number;

  @ApiPropertyOptional()
  @Column({ name: 'estado_id', type: 'int', nullable: true })
  estadoId?: number;

  @ApiPropertyOptional()
  @Column({ name: 'ubicacion', type: 'text', nullable: true })
  ubicacion?: string;

  @ApiPropertyOptional()
  @CreateDateColumn({ name: 'fecha', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha?: Date;

  @ApiPropertyOptional()
  @Column({ name: 'observaciones', type: 'text', nullable: true })
  observaciones?: string;

  @ManyToOne(() => Envio, { eager: false, nullable: true })
  @JoinColumn({ name: 'envio_id' })
  envio?: Envio;

  @ManyToOne(() => EstadoEnvio, { eager: false, nullable: true })
  @JoinColumn({ name: 'estado_id' })
  estado?: EstadoEnvio;

}
