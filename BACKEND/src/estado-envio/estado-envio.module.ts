import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoEnvio } from './estado-envio.entity';
import { EstadoEnvioService } from './estado-envio.service';
import { EstadoEnvioController } from './estado-envio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoEnvio])],
  controllers: [EstadoEnvioController],
  providers: [EstadoEnvioService],
  exports: [EstadoEnvioService],
})
export class EstadoEnvioModule {}
