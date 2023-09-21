import { Component } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {

  vacataires: any[] = [];
  cours: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getVacataires().subscribe((data: any) => {
      this.vacataires = data.vacataires; // récupère les données des vacataires du fichier JSON et les ajoute dans le tab vacataires[]
    });
    this.dataService.getCours().subscribe((data: any) => {
      this.cours = data.cours; // récupère les données des vacataires du fichier JSON et les ajoute dans le tab vacataires[]
    });
    
  }

  helloWorld(id: number){
    const vacataire: any[] = this.vacataires[id]
    console.log(vacataire);
    

  }

}
