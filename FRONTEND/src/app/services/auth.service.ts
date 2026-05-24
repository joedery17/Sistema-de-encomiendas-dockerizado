import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { LoginResponse, Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = '/api';
  
  private currentUserSignal = signal<Usuario | null>(null);
  public currentUser = this.currentUserSignal.asReadonly();

  constructor() {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      try {
        this.currentUserSignal.set(JSON.parse(userStr));
      } catch(e) {}
    }
  }

 login(username: string, password: string) {
  console.log('AuthService.login llamado con:', username, password);
  return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, { 
    username: username, 
    password: password 
  }).pipe(
    tap(response => {
      console.log('Respuesta del servidor:', response);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      this.currentUserSignal.set(response.user as Usuario);
    })
  );
}
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSignal.set(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token') && !!this.currentUserSignal();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}