import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DetalleEncomienda } from '../models/detalle-encomienda.model';

@Injectable({ providedIn: 'root' })
export class DetalleEncomiendaService {
  private http = inject(HttpClient);
  private apiUrl = '/api/detalle-encomienda';

  obtenerTodos() {
    return this.http.get<DetalleEncomienda[]>(this.apiUrl);
  }

  obtenerPorEncomienda(encomiendaId: number) {
    return this.http.get<DetalleEncomienda[]>(`${this.apiUrl}/encomienda/${encomiendaId}`);
  }

  crear(data: Partial<DetalleEncomienda>) {
    return this.http.post<DetalleEncomienda>(this.apiUrl, data);
  }

  actualizar(id: number, data: Partial<DetalleEncomienda>) {
    return this.http.put<DetalleEncomienda>(`${this.apiUrl}/${id}`, data);
  }

  eliminar(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}