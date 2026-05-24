export interface Empleado {
  id?: number;
  nombre: string;
  apellido: string;
  cargo: string;
  telefono?: string;
  sucursalId: number;
  sucursalNombre?: string;
}