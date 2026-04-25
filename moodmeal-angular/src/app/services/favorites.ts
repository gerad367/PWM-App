import {Injectable, signal, effect, PLATFORM_ID, inject} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  // Signal que guarda los IDs de los restaurantes favoritos
  private storageKey = 'moodmeal_favs';
  private platformId = inject(PLATFORM_ID);

  favIds = signal<number[]>([]);

  constructor() {
    // Solo leemos del storage si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        this.favIds.set(JSON.parse(saved));
      }
    }
    // El efecto también debe estar protegido
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(this.storageKey, JSON.stringify(this.favIds()));
      }
    });
  }

  toggleFavorite(id: number) {
    this.favIds.update(ids =>
      ids.includes(id) ? ids.filter(i => i !== id) : [...ids, id]
    );
  }

  // Vaciar todo
  clearAll() {
    this.favIds.set([]);
  }

  isFavorite(id: number): boolean {
    return this.favIds().includes(id);
  }
}
