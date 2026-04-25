import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  // Inyectamos el Router de Angular para poder cambiar de página
  constructor(private router: Router) {}

  setCookie(name: string, value: string, ttl: number, path = "/") {
    const date = new Date();
    date.setTime(date.getTime() + (ttl * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=${path}`;
  }

  // La función que se ejecuta al darle al botón de Login
  onSubmit(event: Event) {
    event.preventDefault(); // Evita que la página recargue

    // Cogemos los valores de los inputs
    const usernameField = document.getElementById('username') as HTMLInputElement;
    const passwordField = document.getElementById('password') as HTMLInputElement;

    fetch('/assets/database/users.json')
      .then(response => response.json())
      .then(data => {
        let user = usernameField.value;
        let passwd = passwordField.value;

        // Buscamos si existe el usuario
        let match = data.users.find((e: any) => e.name === user);

        if (match && match.passwd === passwd) {
          // Si coincide, guardamos cookies y vamos al Home usando Angular Router
          this.setCookie("userLogged", "true", 30);
          this.setCookie("username", user, 30);
          this.setCookie("email", match.mail, 30);

          this.router.navigate(['/']); // Redirección instantánea al Home
        } else {
          // Si falla, vaciamos la contraseña
          passwordField.value = '';
          alert("Usuario o contraseña incorrectos"); // Añadido
        }
      });
  }
}
