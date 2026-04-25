import { Component } from '@angular/core';
import {RestaurantCard} from '../../components/restaurant-card/restaurant-card';

@Component({
  selector: 'app-favourites',
  imports: [RestaurantCard],
  templateUrl: './favourites.html',
  styleUrl: './favourites.css',
})
export class Favourites {}
