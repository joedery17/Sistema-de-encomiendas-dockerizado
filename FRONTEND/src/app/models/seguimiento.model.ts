export interface Seguimiento {
  id?: number;
  envioId: number;
  estadoId: number;
  ubicacion?: string;
  fecha?: Date;
  observaciones?: string;
}