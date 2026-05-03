import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importante
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule], // Añade ReactiveFormsModule aquí
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder); // "El arquitecto de formularios"
  private authService = inject(AuthService);
  private router = inject(Router);

  // Definimos el formulario con sus reglas
  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  async onSubmit() {
    if (this.loginForm.valid) {
      const {username, password} = this.loginForm.value; // 'username' será el email
      try {
        // Usamos el login de Firebase
        await this.authService.login(username, password);
        this.router.navigate(['/']);
      } catch (error) {
        alert("Error al entrar: Usuario o contraseña incorrectos");
        console.error(error);
      }
    }
  }
}
