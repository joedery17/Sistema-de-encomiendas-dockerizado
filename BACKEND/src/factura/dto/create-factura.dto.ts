import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEmail, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFacturaDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  pagoId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  numeroFactura?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nit?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  razonSocial?: string;

}
