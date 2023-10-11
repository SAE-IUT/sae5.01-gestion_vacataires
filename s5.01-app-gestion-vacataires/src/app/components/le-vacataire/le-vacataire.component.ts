import { Component, Input } from '@angular/core';
import Filtre from 'src/app/interfaces/filtre-interface';
import Vacataire from 'src/app/interfaces/vacataire-interface';
import { VacatairesService } from 'src/app/services/vacataires.service';
import { ModulesService } from 'src/app/services/modules.service';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-le-vacataire',
  templateUrl: './le-vacataire.component.html',
  styleUrls: ['./le-vacataire.component.css']
})
export class LeVacataireComponent {

  // Import des données fournies par le parent
  @Input() vacataires: Vacataire[] = [];
  @Input() filtres: Filtre = {};

  errorMessage: string | null = null;

  nomCours: string = '';

  public cours: any[] = []
  
  form = {
  name: "",
  
}



  constructor(private vacatairesService: VacatairesService, private modulesService: ModulesService) {}

  ngOnInit() {
    this.modulesService.getModule().subscribe((data: any) => {
      this.cours = data;
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

  affecterVacataire(vacataireId: string, nomCours: string) {
    console.log(nomCours);
    const vacataire = this.vacataires.find(v => v._id === vacataireId);
  
    if (vacataire && nomCours && !vacataire.modules.includes(nomCours)) {
      this.vacatairesService.affecterVacataire(vacataireId, nomCours).subscribe(() => {
        vacataire.modules.push(nomCours);
        this.errorMessage = null; // Réinitialise le message d'erreur
        // Rechargez la liste des vacataires après l'affectation
        this.vacatairesService.getVacataire().subscribe((data: any) => {
          this.vacataires = data;
           // Fermez le modal ici, car il n'y a pas d'erreur
          const modal = document.getElementById('exampleModalToggle2-' + vacataireId);
          if (modal) {
            modal.querySelector('.btn-close')?.dispatchEvent(new Event('click'));        
          }    
        });
      }, (error) => {
        // Gérer les erreurs ici si nécessaire
        console.error(error);
      });
    } else {
      this.errorMessage = "Ce cours est déjà affecté.";
    }
  }

  desaffecterVacataire(vacataireId: string, nomCours: string) {
    this.vacatairesService.desaffecterVacataire(vacataireId, nomCours).subscribe(() => {
      const vacataire = this.vacataires.find((v) => v._id === vacataireId);
      if (vacataire) {
        // Retirez le cours de la liste des modules du vacataire
        vacataire.modules = vacataire.modules.filter((module: string) => module !== nomCours);
      }
      // Rechargez la liste des vacataires après la désaffectation
      this.vacatairesService.getVacataire().subscribe((data: any) => {
        this.vacataires = data;
      });
    }, (error) => {
      // Gérez les erreurs ici si nécessaire
      console.error(error);
    });
  }

  onModalShow(event: any) {
    // Réinitialise errorMessage lorsque le modal est sur le point d'être affiché
    if (this.errorMessage) {
      this.errorMessage = null;
    }
  }


  hello() {
    console.log(this.cours);
    
  }
}
