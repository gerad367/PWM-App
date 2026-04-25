import {Component, Input} from '@angular/core';
import { RouterLink } from '@angular/router'; // Necesario para que funcione el enlace

@Component({
  selector: 'app-restaurant-card',
  imports: [RouterLink],
  templateUrl: './restaurant-card.html',
  styleUrl: './restaurant-card.css',
})
export class RestaurantCard {
  @Input() restaurant: any = {
    id: 1,
    nombre: 'Restaurante de Prueba',
    imagen: '/assets/images/restaurants_pictures/goiko.png',
    tipo: 'Hamburguesería',
    valoracion: 4.5
  };
}
