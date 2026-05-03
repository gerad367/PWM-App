import { Injectable, signal, inject } from '@angular/core';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);

  // Signal que usará tu HTML para pintar los corazones
  favIds = signal<number[]>([]);

  // Guardamos el ID del usuario logueado
  private userId: string | null = null;

  constructor() {
    // Escuchamos quién está logueado
    this.authService.user$.subscribe(async (user: any) => {
      if (user) {
        this.userId = user.uid;
        await this.loadFavoritesFromCloud(); // Si entra, bajamos sus datos
      } else {
        this.userId = null;
        this.favIds.set([]); // Si cierra sesión, limpiamos la pantalla
      }
    });
  }

  // Bajar de la nube
  private async loadFavoritesFromCloud() {
    if (!this.userId) return;

    // Buscamos el documento del usuario en Firestore
    const userRef = doc(this.firestore, `users/${this.userId}`);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists() && docSnap.data()['favoritos']) {
      this.favIds.set(docSnap.data()['favoritos']);
    } else {
      this.favIds.set([]);
    }
  }

  // Guardar en la nube al darle al corazón
  async toggleFavorite(id: number) {
    if (!this.userId) return;

    // 1. Actualizamos la pantalla al instante
    this.favIds.update(ids =>
      ids.includes(id) ? ids.filter(i => i !== id) : [...ids, id]
    );

    // 2. Subimos el cambio a Firestore silenciosamente
    const userRef = doc(this.firestore, `users/${this.userId}`);
    await setDoc(userRef, { favoritos: this.favIds() }, { merge: true });
  }

  // Vaciar todos los favoritos en la nube
  async clearAll() {
    if (!this.userId) return;

    // 1. Vaciamos la pantalla
    this.favIds.set([]);

    // 2. Vaciamos la base de datos de Firebase
    const userRef = doc(this.firestore, `users/${this.userId}`);
    await setDoc(userRef, { favoritos: [] }, { merge: true });
  }

  isFavorite(id: number): boolean {
    return this.favIds().includes(id);
  }
}
