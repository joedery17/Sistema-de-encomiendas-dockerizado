export interface Entrega {
  id?: number;
  envioId: number;
  fechaEntrega?: Date;
  nombreRecibe: string;
  ciRecibe: string;
  firma?: string;
}