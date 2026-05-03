import { Component, Input, inject } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FavoritesService } from '../../services/favorites';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './restaurant-card.html',
  styleUrl: './restaurant-card.css',
})
export class RestaurantCard {
  @Input() restaurant: any;

  // Inyectamos el servicio de favoritos
  protected favService = inject(FavoritesService);
  public authService = inject(AuthService); // Lo hacemos público para el HTML
  private router = inject(Router);

  toggleFav(event: Event) {
    event.preventDefault(); // Evitamos que al dar al corazón nos lleve a la página del restaurante
    event.stopPropagation();

    if (this.authService.isLoggedIn()) {

      // SI ESTÁ LOGUEADO: Funciona normal
      this.favService.toggleFavorite(this.restaurant.id);
    } else {

      // SI NO ESTÁ LOGUEADO:
      const quiereLoguearse = confirm(
        '¿Te gusta este sitio? ❤️ Inicia sesión para guardarlo en tus favoritos y no perderlo de vista.'
      );

      if (quiereLoguearse) {
        this.router.navigate(['/login']);
      }
    }
  }
}
