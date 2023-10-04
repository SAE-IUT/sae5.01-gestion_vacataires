import { Component } from '@angular/core';
import { VacatairesService } from 'src/app/services/vacataires.service';

@Component({
  selector: 'app-vacataires',
  templateUrl: './vacataires.component.html',
  styleUrls: ['./vacataires.component.css']
})
export class VacatairesComponent {

  public vacataires: any[] = []

  form = {
    name : "",
    lastName: "",
    phone: "",
    email: "", 
    github: "",
    skills: ""
  }

  constructor(private vacatairesService: VacatairesService) {}

  ngOnInit() {
    this.vacatairesService.getVacataire().subscribe((data: any) => {
      this.vacataires = data;               
    });
  }

  addVacataire(name: string, lastName: string, phone: string, email: string, github: string, skills: string) {

    console.log(
      "name : " + name + "\n" +
      "lastName : " + lastName +
      "Phone : " + phone + "\n" +
      "email : " + email + "\n" +
      "github : " + github + "\n" +
      "skills : " + skills + "\n" 
    );

    this.vacatairesService.addVacataire(name, lastName, phone, email, github, skills).subscribe({
      next: (response) => {
        window.location.reload()
      },
      error: (error) => {
        // Gestion des erreurs
        console.error(error);
      },
      complete: () => {
      }
    })

  }

  hello(value: string) {
    console.log(typeof(value));
      
  }

}
