import { Component } from '@angular/core';
import { ModulesService } from 'src/app/services/modules.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent {

  public cours: any[] = [];

  constructor(private modulesService: ModulesService){}

  ngOnInit() {
    this.modulesService.getModule().subscribe((data: any) => {
      this.cours = data;
    });
  }

  deleteModule(id: string) {
    this.modulesService.deleteModule(id).subscribe({
      next: (response) => {
        // Traitement du succès
        console.log(response);
      },
      error: (error) => {
        // Gestion des erreurs
        console.error(error);
      },
      complete: () => {
        window.location.reload()
      }
    });
  }

}
