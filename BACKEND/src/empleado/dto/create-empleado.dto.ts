import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEmail, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEmpleadoDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  apellido?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cargo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  sucursalId?: number;

}
