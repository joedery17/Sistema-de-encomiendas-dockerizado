import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Envio } from './envio.entity';
import { EnvioService } from './envio.service';
import { EnvioController } from './envio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Envio])],
  controllers: [EnvioController],
  providers: [EnvioService],
  exports: [EnvioService],
})
export class EnvioModule {}
