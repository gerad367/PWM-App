import { Injectable, inject } from '@angular/core';
import { Firestore, collection, getDocs, doc, getDoc } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private firestore = inject(Firestore);

  // Obtenemos todos los restaurantes desde Firestore
  getRestaurantes(): Observable<any[]> {
    const restaurantesRef = collection(this.firestore, 'restaurantes');

    return from(getDocs(restaurantesRef)).pipe(
      map(snapshot => {
        return snapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() };
        });
      })
    );
  }

  // Obtenemos un restaurante individual
  getRestauranteById(id: string): Observable<any | undefined> {
    const restauranteDocRef = doc(this.firestore, `restaurantes/${id}`);

    return from(getDoc(restauranteDocRef)).pipe(
      map(snapshot => {
        if (snapshot.exists()) {
          return { id: snapshot.id, ...snapshot.data() };
        }
        return undefined;
      })
    );
  }
}
