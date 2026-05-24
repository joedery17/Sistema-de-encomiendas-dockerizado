import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, CreateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity('usuario')
export class Usuario {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty()
  @Column({ name: 'nombre_usuario', unique: true })
  nombreUsuario!: string;

  @ApiProperty()
  @Column({ name: 'password', type: 'text' })
  password!: string;

  @ApiPropertyOptional()
  @Column({ name: 'rol', nullable: true })
  rol?: string;

  @ApiPropertyOptional()
  @Column({ name: 'estado', type: 'boolean', default: true })
  estado?: boolean;

}
