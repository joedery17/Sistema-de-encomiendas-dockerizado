import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../models/empleado.model';

@Injectable({ providedIn: 'root' })
export class EmpleadoService {
  private http = inject(HttpClient);
  private apiUrl = '/api/empleado';

  obtenerTodos() {
    return this.http.get<Empleado[]>(this.apiUrl);
  }

  obtenerUno(id: number) {
    return this.http.get<Empleado>(`${this.apiUrl}/${id}`);
  }

  crear(data: Partial<Empleado>) {
    return this.http.post<Empleado>(this.apiUrl, data);
  }

  actualizar(id: number, data: Partial<Empleado>) {
    return this.http.put<Empleado>(`${this.apiUrl}/${id}`, data);
  }

  eliminar(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}