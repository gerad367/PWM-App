import { Injectable, signal, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user,
  updateProfile,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider // Importación correcta para la versión modular
} from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);

  isLoggedIn = signal<boolean>(false);
  user$ = user(this.auth);

  constructor() {
    this.user$.subscribe((currentUser: any) => {
      this.isLoggedIn.set(!!currentUser);
    });
  }

  async register(email: string, pass: string) {
    return createUserWithEmailAndPassword(this.auth, email, pass);
  }

  async login(email: string, pass: string) {
    return signInWithEmailAndPassword(this.auth, email, pass);
  }

  async logout() {
    return signOut(this.auth);
  }

  // Actualizamos con re-autenticación incluida
  async updateUserData(nuevoNombre: string, nuevoEmail: string, passwordActual: string, nuevaPass?: string) {
    const usuarioActual = this.auth.currentUser;

    if (usuarioActual && usuarioActual.email) {
      // 1. Creamos la credencial con el email actual y la contraseña que el usuario acaba de poner
      const credential = EmailAuthProvider.credential(usuarioActual.email, passwordActual);

      // 2. Re-autenticamos
      await reauthenticateWithCredential(usuarioActual, credential);

      // 3. Si llegamos aquí, la contraseña era correcta. Procedemos con los cambios:
      await updateProfile(usuarioActual, { displayName: nuevoNombre });

      if (nuevoEmail !== usuarioActual.email) {
        await updateEmail(usuarioActual, nuevoEmail);
      }

      if (nuevaPass && nuevaPass.trim() !== '') {
        await updatePassword(usuarioActual, nuevaPass);
      }
    }
  }
}
