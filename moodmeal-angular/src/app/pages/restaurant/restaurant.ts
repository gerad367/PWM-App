import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../services/data';

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [],
  templateUrl: './restaurant.html',
  styleUrl: './restaurant.css',
})
export class Restaurant implements OnInit {
  private route = inject(ActivatedRoute);
  private dataService = inject(DataService);

  restaurant = signal<any>(null);
  seccionActiva = signal<string>('');

  diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  // Aseguramos que devuelve string[]
  secciones = computed(() => {
    const res = this.restaurant();
    if (!res?.menu) return [] as string[];
    const secs = res.menu.map((p: any) => p.seccion as string);
    return [...new Set(secs)] as string[];
  });

  platosFiltrados = computed(() => {
    const res = this.restaurant();
    if (!res?.menu) return [];
    // Comparamos el signal() con la propiedad del plato
    return res.menu.filter(
      (p: any) => p.seccion === this.seccionActiva()
    );
  });

  cambiarSeccion(seccion: string) {
    this.seccionActiva.set(seccion);
  }

  ngOnInit() {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.dataService.getRestauranteById(id).subscribe(data => {
        if (data) {
          this.restaurant.set(data);
          if (data.menu?.length > 0) {
            this.seccionActiva.set(data.menu[0].seccion);
          }
        }
      });
    }
  }
}
