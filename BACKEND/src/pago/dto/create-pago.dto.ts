import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEmail, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePagoDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  envioId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  monto?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  metodo?: string;

}
