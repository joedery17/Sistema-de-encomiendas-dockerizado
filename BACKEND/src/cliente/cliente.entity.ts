import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, CreateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity('cliente')
export class Cliente {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty()
  @Column({ name: 'nombre' })
  nombre!: string;

  @ApiProperty()
  @Column({ name: 'apellido' })
  apellido!: string;

  @ApiPropertyOptional()
  @Column({ name: 'ci', unique: true, nullable: true })
  ci?: string;

  @ApiPropertyOptional()
  @Column({ name: 'telefono', nullable: true })
  telefono?: string;

  @ApiPropertyOptional()
  @Column({ name: 'email', nullable: true })
  email?: string;

  @ApiPropertyOptional()
  @Column({ name: 'direccion', type: 'text', nullable: true })
  direccion?: string;

  @ApiPropertyOptional()
  @CreateDateColumn({ name: 'fecha_registro', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaRegistro?: Date;

}
