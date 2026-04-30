import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings {
  private authService = inject(AuthService);
  private router = inject(Router);

  // 1. Creamos una señal para saber qué pestaña está activa (por defecto 'preferencias')
  seccionActiva = signal<string>('preferencias');

  // 2. Función para cambiar de pestaña al hacer clic
  cambiarSeccion(seccion: string) {
    this.seccionActiva.set(seccion);
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
