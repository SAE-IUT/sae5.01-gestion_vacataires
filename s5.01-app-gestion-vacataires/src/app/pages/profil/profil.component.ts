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
  constructor(private loginService: LoginService ,private router:Router) {}

  changePassword(password: string, newPassword: string) {
    this.loginService.putNewPassword(password,newPassword).subscribe({
      next: (response) => {
        //Password changed successfully
      },
      error: (error) => {
        // Gestion des erreurs
        console.error(error);
      }
    });
  }

}
