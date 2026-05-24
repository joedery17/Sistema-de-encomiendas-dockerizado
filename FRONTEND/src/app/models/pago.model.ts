export interface Pago {
  id?: number;
  envioId: number;
  monto: number;
  metodo: string;
  fecha?: Date;
}