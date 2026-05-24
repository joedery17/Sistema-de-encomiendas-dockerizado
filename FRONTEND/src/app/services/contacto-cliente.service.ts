import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactoCliente } from '../models/contacto-cliente.model';

@Injectable({ providedIn: 'root' })
export class ContactoClienteService {
  private http = inject(HttpClient);
  private apiUrl = '/api/contacto-cliente';

  obtenerTodos() {
    return this.http.get<ContactoCliente[]>(this.apiUrl);
  }

  obtenerPorCliente(clienteId: number) {
    return this.http.get<ContactoCliente[]>(`${this.apiUrl}/cliente/${clienteId}`);
  }

  crear(data: Partial<ContactoCliente>) {
    return this.http.post<ContactoCliente>(this.apiUrl, data);
  }

  actualizar(id: number, data: Partial<ContactoCliente>) {
    return this.http.put<ContactoCliente>(`${this.apiUrl}/${id}`, data);
  }

  eliminar(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}