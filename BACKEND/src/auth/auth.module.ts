import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { Usuario } from '../usuario/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [AuthController],
})
export class AuthModule {}