import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoPaqueteDto } from './create-tipo-paquete.dto';

export class UpdateTipoPaqueteDto extends PartialType(CreateTipoPaqueteDto) {}
