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
    this.loginService.login(pseudo,password).subscribe({
      next: (response) => {
        //On stock le token en local
        localStorage.setItem("token",(response as res).msg)
        //On redirige vers la dernière route sauvegardée en local
        this.router.navigate(
          [localStorage.getItem("currentRoute")],
        {
          replaceUrl:true
        })

      },
      error: (error) => {
        // Gestion des erreurs
        console.error(error);
        //On cherche l'id du composant d'alert
        const alert = document.getElementById('alertPass');

        if (alert != null ){
          //On affiche l'alert et on attend 3 secondes avant de la desactiver
          alert.style.display = "block"
          setTimeout(() => {
            alert.style.display = "none";
              },3000)
        }

      },
      complete: () => {

      }
    });
  }
}
