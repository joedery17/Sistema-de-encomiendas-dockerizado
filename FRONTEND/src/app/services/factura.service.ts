import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Factura } from '../models/factura.model';

@Injectable({ providedIn: 'root' })
export class FacturaService {
  private http = inject(HttpClient);
  private apiUrl = '/api/factura';

  obtenerTodos() {
    return this.http.get<Factura[]>(this.apiUrl);
  }

  obtenerPorPago(pagoId: number) {
    return this.http.get<Factura>(`${this.apiUrl}/pago/${pagoId}`);
  }

  crear(data: Partial<Factura>) {
    return this.http.post<Factura>(this.apiUrl, data);
  }

  eliminar(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}