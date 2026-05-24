import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, CreateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Cliente } from '../cliente/cliente.entity';

@Entity('encomienda')
export class Encomienda {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty()
  @Column({ name: 'codigo', unique: true })
  codigo!: string;

  @ApiPropertyOptional()
  @Column({ name: 'remitente_id', type: 'int', nullable: true })
  remitenteId?: number;

  @ApiPropertyOptional()
  @Column({ name: 'destinatario_id', type: 'int', nullable: true })
  destinatarioId?: number;

  @ApiPropertyOptional()
  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion?: string;

  @ApiPropertyOptional()
  @Column({ name: 'peso', type: 'decimal', precision: 10, scale: 2, nullable: true })
  peso?: number;

  @ApiPropertyOptional()
  @Column({ name: 'volumen', type: 'decimal', precision: 10, scale: 2, nullable: true })
  volumen?: number;

  @ApiPropertyOptional()
  @Column({ name: 'valor_declarado', type: 'decimal', precision: 10, scale: 2, nullable: true })
  valorDeclarado?: number;

  @ApiPropertyOptional()
  @CreateDateColumn({ name: 'fecha_registro', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaRegistro?: Date;

  @ManyToOne(() => Cliente, { eager: false, nullable: true })
  @JoinColumn({ name: 'remitente_id' })
  remitente?: Cliente;

  @ManyToOne(() => Cliente, { eager: false, nullable: true })
  @JoinColumn({ name: 'destinatario_id' })
  destinatario?: Cliente;

}
