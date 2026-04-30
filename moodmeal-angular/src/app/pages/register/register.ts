import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Definición del formulario con validaciones pro
  registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  async onRegister() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      try {
        await this.authService.register(email, password);
        this.router.navigate(['/']); // Si sale bien, al Home
      } catch (error) {
        alert("Error al registrar: " + error);
      }
    }
  }
}
