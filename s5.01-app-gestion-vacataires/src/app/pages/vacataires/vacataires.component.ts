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
    department: "",
    email: "", 
    linkedin: "",
    discord: ""
  }

  constructor(private vacatairesService: VacatairesService) {}

  ngOnInit() {
    this.vacatairesService.getVacataire().subscribe((data: any) => {
      this.vacataires = data;               
    });
  }

  onSubmit(name: string, lastName: string, department: string, email: string, linkedin: string, discord: string) {
    this.vacatairesService.addVacataire(name, lastName, department, email, linkedin, discord).subscribe({
      next: (response) => {
        window.location.reload()
      },
      error: (error) => {
        // Gestion des erreurs
        console.error(error);
      },
      complete: () => {
      }
    });
  }

  addVacataire(name: string, lastName: string, department: string, email: string, linkedin: string, discord: string) {

    this.vacatairesService.addVacataire(name, lastName, department, email, linkedin, discord).subscribe({
      next: (response) => {
        window.location.reload()
      },
      error: (error) => {
        // Gestion des erreurs
        console.error(error);
      },
      complete: () => {
      }
    });
    
  }

  hello(value: string) {
    console.log(typeof(value));
      
  }

}
