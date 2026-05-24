import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, CreateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Cliente } from '../cliente/cliente.entity';

@Entity('contacto_cliente')
export class ContactoCliente {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty()
  @Column({ name: 'cliente_id', type: 'int' })
  clienteId!: number;

  @ApiPropertyOptional()
  @Column({ name: 'tipo', nullable: true })
  tipo?: string;

  @ApiPropertyOptional()
  @Column({ name: 'nombre', nullable: true })
  nombre?: string;

  @ApiPropertyOptional()
  @Column({ name: 'telefono', nullable: true })
  telefono?: string;

  @ManyToOne(() => Cliente, { eager: false, nullable: true })
  @JoinColumn({ name: 'cliente_id' })
  cliente?: Cliente;

}
