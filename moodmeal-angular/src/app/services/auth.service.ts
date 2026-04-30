import { Injectable, signal, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth); // Inyectamos el "motor" de Firebase Auth

  // Este Signal se actualizará solo gracias a Firebase
  isLoggedIn = signal<boolean>(false);
  user$ = user(this.auth); // Un "observador" que nos dice quién está logueado

  constructor() {
    // Escuchamos si el usuario entra o sale para actualizar el Signal
    this.user$.subscribe((currentUser: any) => {
      this.isLoggedIn.set(!!currentUser);
    });
  }

  // Registro en Firebase
  async register(email: string, pass: string) {
    return createUserWithEmailAndPassword(this.auth, email, pass);
  }

  // Login en Firebase
  async login(email: string, pass: string) {
    return signInWithEmailAndPassword(this.auth, email, pass);
  }

  async logout() {
    return signOut(this.auth);
  }
}
