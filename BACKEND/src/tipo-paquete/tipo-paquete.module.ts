import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoPaquete } from './tipo-paquete.entity';
import { TipoPaqueteService } from './tipo-paquete.service';
import { TipoPaqueteController } from './tipo-paquete.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TipoPaquete])],
  controllers: [TipoPaqueteController],
  providers: [TipoPaqueteService],
  exports: [TipoPaqueteService],
})
export class TipoPaqueteModule {}
