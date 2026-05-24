import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Seguimiento } from '../models/seguimiento.model';

@Injectable({ providedIn: 'root' })
export class SeguimientoService {
  private http = inject(HttpClient);
  private apiUrl = '/api/seguimiento';

  obtenerTodos() {
    return this.http.get<Seguimiento[]>(this.apiUrl);
  }

  obtenerPorEnvio(envioId: number) {
    return this.http.get<Seguimiento[]>(`${this.apiUrl}/envio/${envioId}`);
  }

  crear(data: Partial<Seguimiento>) {
    return this.http.post<Seguimiento>(this.apiUrl, data);
  }
}