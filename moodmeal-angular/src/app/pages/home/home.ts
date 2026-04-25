import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RestaurantCard } from '../../components/restaurant-card/restaurant-card';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RestaurantCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private dataService = inject(DataService);

  // Cargamos todos los restaurantes aquí
  todosLosRestaurantes = signal<any[]>([]);

  // Aquí guardamos lo que el usuario escribe
  textoBusqueda = signal<string>('');

  restaurantesFiltrados = computed(() => {
    const busqueda = this.textoBusqueda().toLowerCase().trim();

    // Si no hay búsqueda, devolvemos todos
    if (!busqueda) return this.todosLosRestaurantes();

    // Filtramos por nombre o por tipo de cocina (según JSON)
    return this.todosLosRestaurantes().filter(res =>
      res.nombre.toLowerCase().includes(busqueda) ||
      res.tipo.toLowerCase().includes(busqueda)
    );
  });

  ngOnInit() {
    this.dataService.getRestaurantes().subscribe(data => {
      this.todosLosRestaurantes.set(data);
    });
  }

  // Función para actualizar la señal desde el HTML
  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.textoBusqueda.set(input.value);
  }
}
