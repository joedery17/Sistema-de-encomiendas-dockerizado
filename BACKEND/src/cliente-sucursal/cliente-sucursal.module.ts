import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteSucursal } from './cliente-sucursal.entity';
import { ClienteSucursalService } from './cliente-sucursal.service';
import { ClienteSucursalController } from './cliente-sucursal.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteSucursal])],
  controllers: [ClienteSucursalController],
  providers: [ClienteSucursalService],
  exports: [ClienteSucursalService],
})
export class ClienteSucursalModule {}
