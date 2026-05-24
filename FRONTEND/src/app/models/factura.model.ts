export interface Factura {
  id?: number;
  pagoId: number;
  numeroFactura: string;
  nit: string;
  razonSocial: string;
  fecha?: Date;
  envioId?: number;
  envioCodigo?: string;
  monto?: number;
}