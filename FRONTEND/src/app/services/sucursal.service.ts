import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sucursal } from '../models/sucursal.model';

@Injectable({ providedIn: 'root' })
export class SucursalService {
  private http = inject(HttpClient);
  private apiUrl = '/api/sucursal';

  obtenerTodos() {
    return this.http.get<Sucursal[]>(this.apiUrl);
  }

  obtenerUno(id: number) {
    return this.http.get<Sucursal>(`${this.apiUrl}/${id}`);
  }

  crear(data: Partial<Sucursal>) {
    return this.http.post<Sucursal>(this.apiUrl, data);
  }

  actualizar(id: number, data: Partial<Sucursal>) {
    return this.http.put<Sucursal>(`${this.apiUrl}/${id}`, data);
  }

  eliminar(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}