import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Entrega } from '../models/entrega.model';

@Injectable({ providedIn: 'root' })
export class EntregaService {
  private http = inject(HttpClient);
  private apiUrl = '/api/entrega';

  obtenerTodos() {
    return this.http.get<Entrega[]>(this.apiUrl);
  }

  obtenerPorEnvio(envioId: number) {
    return this.http.get<Entrega>(`${this.apiUrl}/envio/${envioId}`);
  }

  crear(data: Partial<Entrega>) {
    return this.http.post<Entrega>(this.apiUrl, data);
  }

  actualizar(id: number, data: Partial<Entrega>) {
    return this.http.put<Entrega>(`${this.apiUrl}/${id}`, data);
  }

  eliminar(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}