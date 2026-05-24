import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, CreateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Envio } from '../envio/envio.entity';

@Entity('pago')
export class Pago {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiPropertyOptional()
  @Column({ name: 'envio_id', type: 'int', nullable: true })
  envioId?: number;

  @ApiPropertyOptional()
  @Column({ name: 'monto', type: 'decimal', precision: 10, scale: 2, nullable: true })
  monto?: number;

  @ApiPropertyOptional()
  @Column({ name: 'metodo', nullable: true })
  metodo?: string;

  @ApiPropertyOptional()
  @CreateDateColumn({ name: 'fecha', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha?: Date;

  @ManyToOne(() => Envio, { eager: false, nullable: true })
  @JoinColumn({ name: 'envio_id' })
  envio?: Envio;

}
