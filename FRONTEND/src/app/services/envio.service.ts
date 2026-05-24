import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Envio } from '../models/envio.model';

@Injectable({ providedIn: 'root' })
export class EnvioService {
  private http = inject(HttpClient);
  private apiUrl = '/api/envio';

  obtenerTodos() {
    return this.http.get<Envio[]>(this.apiUrl);
  }

  obtenerUno(id: number) {
    return this.http.get<Envio>(`${this.apiUrl}/${id}`);
  }

  crear(data: Partial<Envio>) {
    return this.http.post<Envio>(this.apiUrl, data);
  }

  actualizar(id: number, data: Partial<Envio>) {
    return this.http.put<Envio>(`${this.apiUrl}/${id}`, data);
  }

  eliminar(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}