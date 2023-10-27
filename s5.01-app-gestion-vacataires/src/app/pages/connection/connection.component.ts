import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from 'src/app/services/login.service';

type res = {
  msg:string
}
@Component({
  selector: 'app-login',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css'],
})
export class ConnectionComponent {

  form = {
    pseudo : "",
    password: "",
  }
  constructor(private loginService: LoginService ,private router:Router) {}

  connect(pseudo: string, password: string) {
    this.loginService.login(pseudo, password).subscribe({
        next: (response) => {
            // On stocke le token en local
            localStorage.setItem("token", (response as res).msg);

            // On récupère la route sauvegardée en local
            const currentRoute = localStorage.getItem("currentRoute");

            if (currentRoute) {
                this.router.navigate(
                    [currentRoute],
                    {
                        replaceUrl: true
                    }
                );
            } else {
                // Si aucune route n'a été sauvegardée, redirigez vers http://localhost:4200/vacataires
                this.router.navigate(['/vacataires'], { replaceUrl: true });
            }
        },
        error: (error) => {
            // Gestion des erreurs
            console.error(error);
            // ...

        },
        complete: () => {

        }
    });
}
}
