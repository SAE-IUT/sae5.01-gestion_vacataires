import { Component, Input } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent {

  cours: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe((data: any) => {
      this.cours = data.cours; // récupère les données des cours du fichier JSON et les ajoute dans le tab cours[]
    });
  }

  afficherCours() {
    console.log(this.cours);

  }
}
