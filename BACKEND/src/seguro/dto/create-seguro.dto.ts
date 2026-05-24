import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEmail, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSeguroDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  encomiendaId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  monto?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  descripcion?: string;

}
