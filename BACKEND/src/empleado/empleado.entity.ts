import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, CreateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Sucursal } from '../sucursal/sucursal.entity';

@Entity('empleado')
export class Empleado {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiPropertyOptional()
  @Column({ name: 'nombre', nullable: true })
  nombre?: string;

  @ApiPropertyOptional()
  @Column({ name: 'apellido', nullable: true })
  apellido?: string;

  @ApiPropertyOptional()
  @Column({ name: 'cargo', nullable: true })
  cargo?: string;

  @ApiPropertyOptional()
  @Column({ name: 'telefono', nullable: true })
  telefono?: string;

  @ApiPropertyOptional()
  @Column({ name: 'sucursal_id', type: 'int', nullable: true })
  sucursalId?: number;

  @ManyToOne(() => Sucursal, { eager: false, nullable: true })
  @JoinColumn({ name: 'sucursal_id' })
  sucursal?: Sucursal;

}
