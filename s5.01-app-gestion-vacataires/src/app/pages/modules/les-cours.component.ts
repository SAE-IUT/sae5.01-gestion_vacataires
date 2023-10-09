import { Component } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { ModulesService } from 'src/app/services/modules.service';

@Component({
  selector: 'app-les-cours',
  templateUrl: './les-cours.component.html',
  styleUrls: ['./les-cours.component.css']
})
export class LesCoursComponent {

  public modules: any[] = []

  form = {
    name : "",
    name_reduit: "",
    color_hexa: "",
    departement: [""],
    matiere: ""
  }

  constructor(private modulesService: ModulesService) {}

  ngOnInit() {
    this.modulesService.getModule().subscribe((data: any) => {
      this.modules = data;
    });
  }

  onSubmit(name: string, name_reduit: string, color_hexa: string, departement: string[], matiere: string) {
    this.modulesService.addModule(name, name_reduit, color_hexa, departement, matiere).subscribe({
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

  addModule(name: string, name_reduit: string, color_hexa: string, departement: string[], matiere: string) {

    this.modulesService.addModule(name, name_reduit, color_hexa, departement, matiere).subscribe({
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
