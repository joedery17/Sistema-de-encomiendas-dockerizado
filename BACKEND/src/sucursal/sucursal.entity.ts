import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, CreateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity('sucursal')
export class Sucursal {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty()
  @Column({ name: 'nombre' })
  nombre!: string;

  @ApiProperty()
  @Column({ name: 'direccion', type: 'text' })
  direccion!: string;

  @ApiPropertyOptional()
  @Column({ name: 'ciudad', nullable: true })
  ciudad?: string;

  @ApiPropertyOptional()
  @Column({ name: 'telefono', nullable: true })
  telefono?: string;

}
