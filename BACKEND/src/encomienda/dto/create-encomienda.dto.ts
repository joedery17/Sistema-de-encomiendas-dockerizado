import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEmail, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEncomiendaDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  codigo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  remitenteId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  destinatarioId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  peso?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  volumen?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  valorDeclarado?: number;

}
