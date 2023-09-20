import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-vacataire',
  templateUrl: './vacataire.component.html',
  styleUrls: ['./vacataire.component.css']
})
export class VacataireComponent {

  vacataires: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe((data: any) => {
      this.vacataires = data.vacataires; // récupère les données des vacataires du fichier JSON et les ajoute dans le tab vacataires[]
    });
  }

  /**
   * permet de déterminer le style de la div status selon le status du vacataire
   * 
   * @param status : le status du vacataire
   * @returns : le style de la div status du vacataire
   */
  getVacataireStatusClass(status: string): string {
    switch (status) {
      case 'en attente':
        return 'status-gray';
      case 'admis':
        return 'status-green';
      default:
        return 'status-red';
    }
  }
}
