export interface DetalleEncomienda {
  id?: number;
  encomiendaId: number;
  tipoId: number;
  cantidad: number;
  observaciones?: string;
  tipoNombre?: string;
}