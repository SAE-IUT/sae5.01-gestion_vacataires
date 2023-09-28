import { Component } from '@angular/core';
import { VacatairesService } from 'src/app/services/vacataires.service';

@Component({
  selector: 'app-le-vacataire',
  templateUrl: './le-vacataire.component.html',
  styleUrls: ['./le-vacataire.component.css']
})
export class LeVacataireComponent {

  public vacataires: any[] = []

  constructor(private vacatairesService: VacatairesService) {}

  ngOnInit() {
    this.vacatairesService.getVacataire().subscribe((data: any) => {
      this.vacataires = data;               
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

  addVacataire(name: string, lastName: string, email: string) {

    this.vacatairesService.addVacataire(name, lastName, email).subscribe({
      next: (response) => {
        window.location.reload()
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
}
