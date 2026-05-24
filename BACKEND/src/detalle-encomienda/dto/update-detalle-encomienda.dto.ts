import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleEncomiendaDto } from './create-detalle-encomienda.dto';

export class UpdateDetalleEncomiendaDto extends PartialType(CreateDetalleEncomiendaDto) {}
