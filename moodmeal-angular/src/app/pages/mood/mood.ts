import {Component, OnInit, OnDestroy, PLATFORM_ID, signal, computed, inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantCard } from '../../components/restaurant-card/restaurant-card';
import { isPlatformBrowser } from '@angular/common'; // Importante
import { DataService } from '../../services/data';

@Component({
  selector: 'app-mood',
  standalone: true,
  imports: [RestaurantCard],
  templateUrl: './mood.html',
  styleUrl: './mood.css'
})
export class Mood implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private dataService = inject(DataService);
  private platformId = inject(PLATFORM_ID); // Inyectamos el detector de plataforma

  currentMood = signal<string>('romantico');
  restaurantes = signal<any[]>([]);

  diccionarioMoods: any = {
    romantico: { imagen: '/assets/images/emoji_romantico1.png', titulo1: 'Romántico', titulo2: 'Una noche especial', titulo3: 'Ambientes íntimos y cenas para recordar' },
    triste: { imagen: '/assets/images/emoji_triste1.png', titulo1: 'Triste', titulo2: 'Comfort para el alma', titulo3: 'Rincones cálidos con comida que reconforta' },
    feliz: { imagen: '/assets/images/emoji_feliz1.png', titulo1: 'Feliz', titulo2: 'Celebra tu alegría', titulo3: 'Lugares vibrantes y llenos de energía positiva' },
    energetico: { imagen: '/assets/images/emoji_energetico1.png', titulo1: 'Energético', titulo2: 'Potencia máxima', titulo3: 'Sabores intensos que despiertan todos tus sentidos' }
  };

  moodData = computed(() => this.diccionarioMoods[this.currentMood()] || this.diccionarioMoods['romantico']);

  restaurantesFiltrados = computed(() =>
    this.restaurantes().filter(r => r.moods.includes(this.currentMood()))
  );

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const mood = params['mood'] || 'romantico';
      this.currentMood.set(mood);

      // ESCUDO: Solo ejecutamos esto si estamos en el navegador
      if (isPlatformBrowser(this.platformId)) {
        document.body.className = `mood-${mood}`;
      }
    });

    this.dataService.getRestaurantes().subscribe(data => {
      this.restaurantes.set(data);
    });
  }

  ngOnDestroy() {
    // Limpieza solo en navegador
    if (isPlatformBrowser(this.platformId)) {
      document.body.className = '';
    }
  }
}
