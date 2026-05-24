import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seguro } from './seguro.entity';
import { SeguroService } from './seguro.service';
import { SeguroController } from './seguro.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Seguro])],
  controllers: [SeguroController],
  providers: [SeguroService],
  exports: [SeguroService],
})
export class SeguroModule {}
