import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEmail, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateContactoClienteDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  clienteId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tipo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  telefono?: string;

}
