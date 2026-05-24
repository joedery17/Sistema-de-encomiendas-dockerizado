import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoEnvioDto } from './create-estado-envio.dto';

export class UpdateEstadoEnvioDto extends PartialType(CreateEstadoEnvioDto) {}
