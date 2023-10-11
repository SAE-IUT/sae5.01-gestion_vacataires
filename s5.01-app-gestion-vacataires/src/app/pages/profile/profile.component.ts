import {Component} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

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
