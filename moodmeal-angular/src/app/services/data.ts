import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private jsonUrl = '/assets/data/data.json';

  constructor(private http: HttpClient) {}

  getRestaurantes(): Observable<any[]> {
    return this.http.get<any>(this.jsonUrl).pipe(map(data => data.restaurantes));
  }

  getRestauranteById(id: string): Observable<any | undefined> {
    return this.http.get<any>(this.jsonUrl).pipe(
      map(data => data.restaurantes.find((r: any) => r.id.toString() === id))
    );
  }
}
