import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Encomienda } from '../models/encomienda.model';

@Injectable({ providedIn: 'root' })
export class EncomiendaService {
  private http = inject(HttpClient);
  private apiUrl = '/api/encomienda';

  obtenerTodos() {
    return this.http.get<Encomienda[]>(this.apiUrl);
  }

  obtenerUno(id: number) {
    return this.http.get<Encomienda>(`${this.apiUrl}/${id}`);
  }

  crear(data: Partial<Encomienda>) {
    return this.http.post<Encomienda>(this.apiUrl, data);
  }

  actualizar(id: number, data: Partial<Encomienda>) {
    return this.http.put<Encomienda>(`${this.apiUrl}/${id}`, data);
  }

  eliminar(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}