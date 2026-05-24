import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente.model';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private http = inject(HttpClient);
  private apiUrl = '/api/cliente';

  obtenerTodos() {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  obtenerUno(id: number) {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  crear(data: Partial<Cliente>) {
    return this.http.post<Cliente>(this.apiUrl, data);
  }

  actualizar(id: number, data: Partial<Cliente>) {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, data);
  }

  eliminar(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}