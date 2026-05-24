import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEmail, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDetalleEncomiendaDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  encomiendaId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  tipoId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  cantidad?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  observaciones?: string;

}
