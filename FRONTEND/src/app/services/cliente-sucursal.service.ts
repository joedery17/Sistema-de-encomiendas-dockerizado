import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClienteSucursal } from '../models/cliente-sucursal.model';

@Injectable({ providedIn: 'root' })
export class ClienteSucursalService {
  private http = inject(HttpClient);
  private apiUrl = '/api/cliente-sucursal';

  obtenerTodos() {
    return this.http.get<ClienteSucursal[]>(this.apiUrl);
  }

  obtenerPorCliente(clienteId: number) {
    return this.http.get<ClienteSucursal[]>(`${this.apiUrl}/cliente/${clienteId}`);
  }

  crear(data: Partial<ClienteSucursal>) {
    return this.http.post<ClienteSucursal>(this.apiUrl, data);
  }

  eliminar(clienteId: number, sucursalId: number) {
    return this.http.delete<void>(`${this.apiUrl}/${clienteId}/${sucursalId}`);
  }
}