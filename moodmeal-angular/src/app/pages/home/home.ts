import {Component, inject, OnInit, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {RestaurantCard} from '../../components/restaurant-card/restaurant-card';
import {DataService} from '../../services/data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    RestaurantCard
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home implements OnInit {
  private dataService = inject(DataService);

  restaurantes = signal<any[]>([]);

    ngOnInit(){

      this.dataService.getRestaurantes().subscribe({
        next: (data) => {
          console.log("✅ Datos recibidos:", data);
          this.restaurantes.set(data); // Guardamos los datos en la señal
        },
        error: (err) => console.error("❌ Error cargando JSON:", err)
      });
    }

}
