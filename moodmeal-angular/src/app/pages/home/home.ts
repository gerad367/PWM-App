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

  todosLosRestaurantes = signal<any[]>([]);
  textoBusqueda = signal<string>('');

  restaurantesFiltrados = computed(() => {
    const busqueda = this.textoBusqueda().toLowerCase().trim();
    if (!busqueda) return this.todosLosRestaurantes();

    return this.todosLosRestaurantes().filter(res =>
      res?.nombre?.toLowerCase().includes(busqueda) ||
      res?.tipo?.toLowerCase().includes(busqueda)
    );
  });

  ngOnInit() {
    // Llamada limpia a Firebase
    this.dataService.getRestaurantes().subscribe(data => {
      this.todosLosRestaurantes.set(data);
    });
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.textoBusqueda.set(input.value);
  }
}
