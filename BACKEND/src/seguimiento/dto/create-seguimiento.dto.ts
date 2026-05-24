import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEmail, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSeguimientoDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  envioId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  estadoId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  ubicacion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  observaciones?: string;

}
