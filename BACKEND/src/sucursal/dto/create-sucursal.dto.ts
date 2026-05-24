import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEmail, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSucursalDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  direccion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  ciudad?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  telefono?: string;

}
