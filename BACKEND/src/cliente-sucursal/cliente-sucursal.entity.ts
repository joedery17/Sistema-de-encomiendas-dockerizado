import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, CreateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Cliente } from '../cliente/cliente.entity';
import { Sucursal } from '../sucursal/sucursal.entity';

@Entity('cliente_sucursal')
export class ClienteSucursal {
  @ApiProperty()
  @PrimaryColumn({ name: 'cliente_id', type: 'int' })
  clienteId!: number;

  @ApiProperty()
  @PrimaryColumn({ name: 'sucursal_id', type: 'int' })
  sucursalId!: number;

  @ManyToOne(() => Cliente, { eager: false, nullable: true })
  @JoinColumn({ name: 'cliente_id' })
  cliente?: Cliente;

  @ManyToOne(() => Sucursal, { eager: false, nullable: true })
  @JoinColumn({ name: 'sucursal_id' })
  sucursal?: Sucursal;

}
