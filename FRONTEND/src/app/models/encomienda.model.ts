export interface Encomienda {
  id?: number;
  codigo: string;
  remitenteId: number;
  destinatarioId: number;
  descripcion?: string;
  peso?: number;
  volumen?: number;
  valorDeclarado?: number;
  fechaRegistro?: Date;
}