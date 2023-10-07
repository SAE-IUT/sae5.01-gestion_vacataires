import { Component, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ModulesService } from 'src/app/services/modules.service';

interface Module {
  _id: string,
  name: string,
  name_reduit: string,
  color_hexa: string,
  departement: string[],
  matiere: string,
}

interface Filter {
  [key: string]: string | null,
}

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent {

  @Input() modules: Module[] = [];
  @Input() filtres: Filter = {};

  private searchProperty: string = 'name';

  constructor(
    private modulesService: ModulesService,
  ){}

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

  isInFilter(cours: any) {
    for (const [filterName, filterValue] of Object.entries(this.filtres)) {
      const property = cours?.[filterName];
      
      if (property) {
        if (property instanceof Array) {
          if (!property.includes(filterValue?.toLowerCase())) return false;
        } else if (filterName === this.searchProperty) {
          if (!property.toUpperCase().includes(filterValue?.toUpperCase())) {
            return false;
          }
        } else if (property.toUpperCase() !== filterValue?.toUpperCase()) {
          return false;
        }
      }
    }

    return true;
  }

}
