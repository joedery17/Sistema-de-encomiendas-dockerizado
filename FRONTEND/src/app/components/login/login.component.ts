import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  usuario = '';
  contrasena = '';
  cargando = signal(false);
  mensajeError = signal('');

  onSubmit() {
    if (!this.usuario || !this.contrasena) {
      this.mensajeError.set('Por favor ingrese usuario y contraseña');
      return;
    }

    this.cargando.set(true);
    this.mensajeError.set('');

    this.authService.login(this.usuario, this.contrasena).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error de login:', error);
        this.mensajeError.set(error.error?.message || 'Error de autenticación');
        this.cargando.set(false);
      },
      complete: () => {
        this.cargando.set(false);
      }
    });
  }
}