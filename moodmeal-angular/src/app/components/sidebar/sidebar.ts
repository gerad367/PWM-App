import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  @Input() isOpen = false;
  @Output() closeSidebar = new EventEmitter<void>();

  // Inyectamos el servicio de forma PÚBLICA para usarlo en el HTML
  public authService = inject(AuthService);
  private router = inject(Router);

  toggle() {
    this.closeSidebar.emit();
  }

  logout() {
    this.authService.logout();
    this.toggle(); // Cerramos el sidebar
    this.router.navigate(['/login']); // Mandamos al usuario al login tras salir
  }
}
