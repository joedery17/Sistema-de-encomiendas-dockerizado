import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, CreateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Envio } from '../envio/envio.entity';

@Entity('entrega')
export class Entrega {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiPropertyOptional()
  @Column({ name: 'envio_id', type: 'int', unique: true, nullable: true })
  envioId?: number;

  @ApiPropertyOptional()
  @Column({ name: 'fecha_entrega', type: 'timestamp', nullable: true })
  fechaEntrega?: Date;

  @ApiPropertyOptional()
  @Column({ name: 'nombre_recibe', nullable: true })
  nombreRecibe?: string;

  @ApiPropertyOptional()
  @Column({ name: 'ci_recibe', nullable: true })
  ciRecibe?: string;

  @ApiPropertyOptional()
  @Column({ name: 'firma', type: 'text', nullable: true })
  firma?: string;

  @OneToOne(() => Envio, { eager: false, nullable: true })
  @JoinColumn({ name: 'envio_id' })
  envio?: Envio;

}
