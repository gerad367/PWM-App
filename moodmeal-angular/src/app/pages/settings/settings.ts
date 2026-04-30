import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings {
  private authService = inject(AuthService);
  private router = inject(Router);

  logout(event: Event) {
    event.preventDefault(); // Evita cualquier comportamiento por defecto del enlace

    // 1. Llamamos al servicio para limpiar la cookie y el Signal
    this.authService.logout();

    // 2. Redirigimos al Login
    this.router.navigate(['/login']);
  }
}
