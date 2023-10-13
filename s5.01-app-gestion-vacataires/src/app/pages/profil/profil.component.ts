import {Component} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {

  form = {
    password: "",
    newPassword : "",
  }
  constructor(private loginService: LoginService ,private router:Router) {
    const token = localStorage.getItem('token')
    if(!token){
      router.navigate(
        ['/connexion']
      )
    }
  }



  changePassword(password: string, newPassword: string) {
    this.loginService.putNewPassword(password,newPassword).subscribe({
      next: (response) => {
        const alert = document.getElementById('alertCreated');

        if (alert != null ){
          //On affiche l'alert et on attend 3 secondes avant de la desactiver
          alert.style.display = "block"
          setTimeout(() => {
            alert.style.display = "none";
          },3000)
        }
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

      }
    });
  }

  disconnect() {
    localStorage.clear()
    this.router.navigate(
      ['/connexion'],
      {
        replaceUrl:true
      })
  }
}
