import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoPaquete } from '../models/tipo-paquete.model';

@Injectable({ providedIn: 'root' })
export class TipoPaqueteService {
  private http = inject(HttpClient);
  private apiUrl = '/api/tipo-paquete';

  obtenerTodos() {
    return this.http.get<TipoPaquete[]>(this.apiUrl);
  }

  crear(data: Partial<TipoPaquete>) {
    return this.http.post<TipoPaquete>(this.apiUrl, data);
  }

  actualizar(id: number, data: Partial<TipoPaquete>) {
    return this.http.put<TipoPaquete>(`${this.apiUrl}/${id}`, data);
  }

  eliminar(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}