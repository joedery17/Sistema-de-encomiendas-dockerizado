import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEmail, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEntregaDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  envioId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  fechaEntrega?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nombreRecibe?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  ciRecibe?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  firma?: string;

}
