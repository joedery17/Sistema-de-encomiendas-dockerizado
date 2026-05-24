import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteSucursalDto } from './create-cliente-sucursal.dto';

export class UpdateClienteSucursalDto extends PartialType(CreateClienteSucursalDto) {}
