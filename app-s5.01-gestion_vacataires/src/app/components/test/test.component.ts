import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Vacataire } from 'src/app/models/vacataire';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  constructor(private dataService: DataService) {}

  newVacataire: Vacataire = {
    id: 0,
    name: '',
    lastName: '',
    department: [],
    email: '',
    skills: [],
    socials: [],
    status: '',
  };


  createVacataire() {
    this.dataService.createVacataire(this.newVacataire).subscribe((response) => {
      // Gérez la réponse ici (par exemple, réinitialisez le formulaire)
      console.log('Vacataire créé avec succès !');
      // Réinitialisez le formulaire après la création réussie
      this.newVacataire = {
        id: 0,
        name: '',
        lastName: '',
        department: [],
        email: '',
        skills: [],
        socials: [],
        status: '',
      };
    });
  }
  
}
