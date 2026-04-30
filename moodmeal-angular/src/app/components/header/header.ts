import {Component, Output, EventEmitter, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Output() menuClicked = new EventEmitter<void>();

  // Inyectamos el servicio para saber el estado de la sesión
  public authService = inject(AuthService);

  onMenuClick() {
    this.menuClicked.emit();
  }
}
