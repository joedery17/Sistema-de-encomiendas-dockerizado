import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEmail, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUsuarioDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nombreUsuario?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  rol?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  estado?: boolean;

}
