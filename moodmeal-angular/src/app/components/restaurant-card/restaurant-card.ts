import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FavoritesService } from '../../services/favorites';

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
  favService = inject(FavoritesService);

  toggleFav(event: Event) {
    event.preventDefault(); // Evitamos que al dar al corazón nos lleve a la página del restaurante
    event.stopPropagation();
    this.favService.toggleFavorite(this.restaurant.id);
  }
}
