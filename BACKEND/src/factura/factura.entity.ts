import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, CreateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Pago } from '../pago/pago.entity';

@Entity('factura')
export class Factura {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiPropertyOptional()
  @Column({ name: 'pago_id', type: 'int', unique: true, nullable: true })
  pagoId?: number;

  @ApiPropertyOptional()
  @Column({ name: 'numero_factura', nullable: true })
  numeroFactura?: string;

  @ApiPropertyOptional()
  @Column({ name: 'nit', nullable: true })
  nit?: string;

  @ApiPropertyOptional()
  @Column({ name: 'razon_social', nullable: true })
  razonSocial?: string;

  @ApiPropertyOptional()
  @CreateDateColumn({ name: 'fecha', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha?: Date;

  @OneToOne(() => Pago, { eager: false, nullable: true })
  @JoinColumn({ name: 'pago_id' })
  pago?: Pago;

}
