import { Component, Input } from '@angular/core';
import Filtre from 'src/app/interfaces/filtre-interface';
import Module from 'src/app/interfaces/module-interface';
import { ModulesService } from 'src/app/services/modules.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent {

  // Import des données fournies par le parent
  @Input() modules: Module[] = [];
  @Input() filtres: Filtre = {};

  form = {
    name : "",
    name_reduit: "",
    color_hexa: "",
    departement: [""],
    matiere: ""
  }

  constructor(private modulesService: ModulesService){}

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

  /**
   * Vérifie si un cours correspond aux filtres actifs
   * @param cours Cours à vérifier
   * @returns boolean
   */
  isInFilter(cours: Module) {
    let state = true; // Est valide par défaut

    for (const [filterName, filterValue] of Object.entries(this.filtres)) {
      if (filterName === 'search') { // Si barre de recherche
        let found = false;

        // Propriétés de la recherche
        const name = cours.name.toUpperCase();
        const nameReduit = cours.name_reduit.toUpperCase();

        if (name.includes(filterValue.toUpperCase()) || nameReduit.includes(filterValue.toUpperCase())) {
          found = true;
        }

        state = found;
      } else {
        const property = cours?.[filterName as keyof Module];

        if (property) {
          if (property instanceof Array) {
            if (property.findIndex(el => el.toUpperCase() === filterValue.toUpperCase()) === -1) {
              state = false;
            }
          } else if (property.toUpperCase() !== filterValue?.toUpperCase()) {
            state = false;
          }
        }
      }
    }

    return state;
  }

  updateModule(id: string, name: string, name_reduit: string, color_hexa: string, departement: string[], matiere: string ){
    this.modulesService.updateModule(id,name,name_reduit,color_hexa,departement,matiere).subscribe({
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
