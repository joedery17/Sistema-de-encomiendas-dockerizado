import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEmail, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEstadoEnvioDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nombre?: string;

}
