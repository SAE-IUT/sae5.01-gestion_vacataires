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
    this.loginService.getPasswordValid(pseudo,password).subscribe({
      next: (response) => {
        //window.location.reload()
        localStorage.setItem("token",(response as res).msg)
        this.router.navigate(
          [localStorage.getItem("currentRoute")],
        {
          replaceUrl:true
        })

      },
      error: (error) => {
        // Gestion des erreurs
        console.error(error);
        const alert = document.getElementById('alertPass');

        if (alert != null ){
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
