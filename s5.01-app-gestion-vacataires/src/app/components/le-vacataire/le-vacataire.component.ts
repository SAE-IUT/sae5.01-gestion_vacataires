import { Component, Input } from '@angular/core';
import { VacatairesService } from 'src/app/services/vacataires.service';

interface Vacataire {
  _id: string,
  name: string,
  lastName: string,
  phone: string,
  email: string,
  github: string,
  skills: string[],
  modules: string[],
  status: string,
}

interface Filter {
  [key: string]: string | null,
}

@Component({
  selector: 'app-le-vacataire',
  templateUrl: './le-vacataire.component.html',
  styleUrls: ['./le-vacataire.component.css']
})
export class LeVacataireComponent {

  // public vacataires: any[] = []
  @Input() vacataires: Vacataire[] = [];
  @Input() filtres: Filter = {};

  private searchProperty: string = 'name';

  constructor(private vacatairesService: VacatairesService) {}

  ngOnInit() {
    // this.vacatairesService.getVacataire().subscribe((data: any) => {
    //   this.vacataires = data;               
    // });
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

  deleteVacataire(id: string) {
    this.vacatairesService.deleteVacataire(id).subscribe({
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
          if (!property.includes(filterValue)) return false;
        } else if (filterName === this.searchProperty) {
          console.log(property + ' ' + cours.lastName);
          if (!(property + ' ' + cours.lastName).toUpperCase().includes(filterValue?.toUpperCase() ?? '') && !(cours.lastName + ' ' + property).toUpperCase().includes(filterValue?.toUpperCase() ?? '')) {
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
