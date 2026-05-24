export interface Usuario {
  id?: number;
  nombre_usuario: string;
  password?: string;
  rol: string;
  estado: boolean;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    nombre_usuario: string;
    rol: string;
  };
}