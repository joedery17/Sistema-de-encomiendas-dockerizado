import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factura } from './factura.entity';
import { FacturaService } from './factura.service';
import { FacturaController } from './factura.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Factura])],
  controllers: [FacturaController],
  providers: [FacturaService],
  exports: [FacturaService],
})
export class FacturaModule {}
