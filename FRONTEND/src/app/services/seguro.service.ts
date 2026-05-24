import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Seguro } from '../models/seguro.model';

@Injectable({ providedIn: 'root' })
export class SeguroService {
  private http = inject(HttpClient);
  private apiUrl = '/api/seguro';

  obtenerTodos() {
    return this.http.get<Seguro[]>(this.apiUrl);
  }

  obtenerPorEncomienda(encomiendaId: number) {
    return this.http.get<Seguro>(`${this.apiUrl}/encomienda/${encomiendaId}`);
  }

  crear(data: Partial<Seguro>) {
    return this.http.post<Seguro>(this.apiUrl, data);
  }

  actualizar(id: number, data: Partial<Seguro>) {
    return this.http.put<Seguro>(`${this.apiUrl}/${id}`, data);
  }

  eliminar(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}