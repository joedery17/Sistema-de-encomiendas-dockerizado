import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEmail, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEnvioDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  encomiendaId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  sucursalOrigenId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  sucursalDestinoId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  fechaEnvio?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  fechaEstimada?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  costo?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  estadoId?: number;

}
