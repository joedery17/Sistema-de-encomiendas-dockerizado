import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Encomienda } from './encomienda.entity';
import { EncomiendaService } from './encomienda.service';
import { EncomiendaController } from './encomienda.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Encomienda])],
  controllers: [EncomiendaController],
  providers: [EncomiendaService],
  exports: [EncomiendaService],
})
export class EncomiendaModule {}
