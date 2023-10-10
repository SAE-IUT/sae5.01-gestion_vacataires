import { Component, Input } from '@angular/core';
import Filtre from 'src/app/interfaces/filtre-interface';
import Vacataire from 'src/app/interfaces/vacataire-interface';
import { VacatairesService } from 'src/app/services/vacataires.service';

@Component({
  selector: 'app-le-vacataire',
  templateUrl: './le-vacataire.component.html',
  styleUrls: ['./le-vacataire.component.css']
})
export class LeVacataireComponent {

  // Import des données fournies par le parent
  @Input() vacataires: Vacataire[] = [];
  @Input() filtres: Filtre = {};

  constructor(private vacatairesService: VacatairesService) {}

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

  /**
   * Vérifie si un cours correspond aux filtres actifs
   * @param vacataire Vacataire à vérifier
   * @returns boolean
   */
  isInFilter(vacataire: Vacataire) {
    let state = true; // Est validé par défaut

    for (const [filterName, filterValue] of Object.entries(this.filtres)) {
      if (filterName === 'search') {
        let found = false;

        // Propriétés de la recherche
        const name = vacataire.name.toUpperCase();
        const lastName = vacataire.lastName.toUpperCase();

        if ((name + ' ' + lastName).includes(filterValue.toUpperCase()) || (lastName + ' ' + name).includes(filterValue.toUpperCase())) {
          found = true;
        }

        state = found;
      } else {
        const property = vacataire?.[filterName as keyof Vacataire];

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

}
