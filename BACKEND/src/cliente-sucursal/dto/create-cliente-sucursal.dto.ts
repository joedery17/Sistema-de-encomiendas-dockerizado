import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEmail, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateClienteSucursalDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  clienteId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  sucursalId?: number;

}
