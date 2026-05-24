import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleEncomienda } from './detalle-encomienda.entity';
import { DetalleEncomiendaService } from './detalle-encomienda.service';
import { DetalleEncomiendaController } from './detalle-encomienda.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleEncomienda])],
  controllers: [DetalleEncomiendaController],
  providers: [DetalleEncomiendaService],
  exports: [DetalleEncomiendaService],
})
export class DetalleEncomiendaModule {}
