export interface Envio {
  id?: number;
  encomiendaId: number;
  sucursalOrigenId: number;
  sucursalDestinoId: number;
  fechaEnvio?: Date;
  fechaEstimada?: Date;
  costo?: number;
  estadoId?: number;
}