import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pago } from '../models/pago.model';

@Injectable({ providedIn: 'root' })
export class PagoService {
  private http = inject(HttpClient);
  private apiUrl = '/api/pago';

  obtenerTodos() {
    return this.http.get<Pago[]>(this.apiUrl);
  }

  obtenerPorEnvio(envioId: number) {
    return this.http.get<Pago>(`${this.apiUrl}/envio/${envioId}`);
  }

  crear(data: Partial<Pago>) {
    return this.http.post<Pago>(this.apiUrl, data);
  }

  actualizar(id: number, data: Partial<Pago>) {
    return this.http.put<Pago>(`${this.apiUrl}/${id}`, data);
  }

  eliminar(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}