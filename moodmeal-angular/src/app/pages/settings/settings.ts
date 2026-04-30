import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule], // Importante añadir ReactiveFormsModule
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  seccionActiva = signal<string>('perfil');
  profileForm!: FormGroup; // Aquí guardaremos nuestro formulario

  ngOnInit() {
    // Inicializamos el formulario con validaciones
    this.profileForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]] // Opcional, por eso no es 'required'
    });

    // Rellenamos el formulario con los datos actuales del usuario
    this.authService.user$.subscribe(user => {
      if (user) {
        this.profileForm.patchValue({
          nombre: user.displayName || '',
          email: user.email || ''
        });
      }
    });
  }

  cambiarSeccion(seccion: string) {
    this.seccionActiva.set(seccion);
  }

  async onSaveProfile() {
    if (this.profileForm.valid) {
      const { nombre, email, password } = this.profileForm.value;
      try {
        await this.authService.updateUserData(nombre, email, password);
        alert('¡Perfil actualizado con éxito! ✨');
      } catch (error) {
        alert('Error al actualizar: ' + error);
      }
    }
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
