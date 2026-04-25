import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { RestaurantCard } from '../../components/restaurant-card/restaurant-card';
import { DataService } from '../../services/data';
import { FavoritesService } from '../../services/favorites';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [RestaurantCard],
  templateUrl: './favourites.html',
  styleUrl: './favourites.css'
})
export class Favourites implements OnInit {
  private dataService = inject(DataService);
  public favService = inject(FavoritesService);

  todosLosRestaurantes = signal<any[]>([]);

  // Señal para el orden: 'fecha', 'asc' (A-Z), 'desc' (Z-A)
  ordenActual = signal<string>('fecha');

  // Filtramos y LUEGO ordenamos
  misFavoritosOrdenados = computed(() => {
    // 1. Filtrar los que son favoritos
    let lista = this.todosLosRestaurantes().filter(res =>
      this.favService.favIds().includes(res.id)
    );

    // 2. Aplicar el orden
    const orden = this.ordenActual();

    if (orden === 'asc') {
      return [...lista].sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (orden === 'desc') {
      return [...lista].sort((a, b) => b.nombre.localeCompare(a.nombre));
    } else {
      // Por 'fecha' simplemente respetamos el orden del array de IDs (el último añadido)
      // Como el service hace [...ids, id], los nuevos están al final.
      // Si quieres los más nuevos primero, harías .reverse()
      const ids = this.favService.favIds();
      return [...lista].sort((a, b) => ids.indexOf(b.id) - ids.indexOf(a.id));
    }
  });

  ngOnInit() {
    this.dataService.getRestaurantes().subscribe(data => {
      this.todosLosRestaurantes.set(data);
    });
  }

  cambiarOrden(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.ordenActual.set(select.value);
  }

  vaciarFavoritos() {
    if (confirm('¿Seguro que quieres borrar todos tus favoritos?')) {
      this.favService.clearAll();
    }
  }
}
