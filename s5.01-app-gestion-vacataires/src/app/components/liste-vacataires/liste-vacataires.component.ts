import { Component, Input } from '@angular/core';
import Filtre from 'src/app/interfaces/filtre-interface';
import Module from 'src/app/interfaces/module-interface';
import Vacataire from 'src/app/interfaces/vacataire-interface';
import { ModulesService } from 'src/app/services/modules.service';
import { VacatairesService } from 'src/app/services/vacataires.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-liste-vacataires',
  templateUrl: './liste-vacataires.component.html',
  styleUrls: ['./liste-vacataires.component.css']
})
export class ListeVacatairesComponent {

  // Import des données fournies par le parent
  @Input() vacataires: Vacataire[] = [];
  @Input() filtres: Filtre = {};

  public cours: Module[] = []

  errorMessage: string | null = null;

  nomCours_reduit: string = '';

  selectedSkill: string = ''; // Ajoutez la variable selectedSkill pour stocker la compétence sélectionnée

  skillsList: string[] = ['Administration réseau', 'Développement Web', 'Gestion de projet', 'Cybersécurité', 'Développement d’applications', 'Communication' , 'Base de données' ];

  comp: string[] = [];



  form  = {
    _id:"",
    name: "",
    lastName:"",
    phone: "",
    email: "",
    github: "",
    skills: [""]
  }




  constructor(private vacatairesService: VacatairesService, private modulesService: ModulesService) {}

  ngOnInit() {
    this.modulesService.getModule().subscribe((data: unknown) => {
      this.cours = data as Module[];
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
      case 'affecté':
        return 'status-green';
      case 'non affecté':
        return 'status-red';
      default:
        return 'status-red';
    }
  }

  addSkill(): void {
    if (!this.form.skills) {
      this.form.skills = [];
    }

    if (this.selectedSkill && !this.form.skills.includes(this.selectedSkill)) {
      this.form.skills.push(this.selectedSkill);
    }
  }
  removeSkill(skill: string) {
    // Supprimez la compétence du tableau
    const index = this.form.skills.indexOf(skill);
    if (index !== -1) {
      this.form.skills.splice(index, 1);
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

  /* dans le controllers */
initializeFormWithId(id: string) {
  const vacataire = this.vacataires.find(vacataire => vacataire._id === id);


  if (vacataire) {
    this.form._id = vacataire._id;
    this.form.name = vacataire.name;
    this.form.lastName = vacataire.lastName;
    this.form.phone = vacataire.phone;
    this.form.email = vacataire.email;
    this.form.github = vacataire.github;
    this.form.skills = vacataire.skills;
  }
}

onSubmit() {
  this.editVacataire(this.form._id, this.form.name, this.form.lastName, this.form.phone, this.form.email, this.form.github, this.form.skills)
}

editVacataire(id: String, name: string, lastName: string, phone: string, email: string, github: string, skills: string[]) {
  console.log(name);

  this.vacatairesService.editVacataire(id, name, lastName, phone, email, github, skills).subscribe({
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




  affecterVacataire(vacataireId: string, nomCours_reduit: string) {
    console.log(nomCours_reduit);
    const vacataire = this.vacataires.find(v => v._id === vacataireId);

    if (vacataire && nomCours_reduit && !vacataire.modules.includes(nomCours_reduit)) {
      this.vacatairesService.affecterVacataire(vacataireId, nomCours_reduit).subscribe(() => {
        vacataire.modules.push(nomCours_reduit);
        this.errorMessage = null; // Réinitialise le message d'erreur
        // Rechargez la liste des vacataires après l'affectation
        this.vacatairesService.getVacataire().subscribe((data: unknown) => {
          this.vacataires = data as Vacataire[];
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

  desaffecterVacataire(vacataireId: string, nomCours_reduit: string) {
    this.vacatairesService.desaffecterVacataire(vacataireId, nomCours_reduit).subscribe(() => {
      const vacataire = this.vacataires.find((v) => v._id === vacataireId);
      if (vacataire) {
        // Retirez le cours de la liste des modules du vacataire
        vacataire.modules = vacataire.modules.filter((module: string) => module !== nomCours_reduit);
      }
      // Rechargez la liste des vacataires après la désaffectation
      this.vacatairesService.getVacataire().subscribe((data: unknown) => {
        this.vacataires = data as Vacataire[];
      });
      const modal = document.getElementById('exampleModalToggle3-' + vacataireId);
          if (modal) {
            modal.querySelector('.btn-close')?.dispatchEvent(new Event('click'));
          }
    }, (error) => {
      // Gérez les erreurs ici si nécessaire
      console.error(error);
    });
  }

  onModalShow(event: Event) {
    // Réinitialise errorMessage lorsque le modal est sur le point d'être affiché
    if (this.errorMessage) {
      this.errorMessage = null;
    }
  }

  logoTelClick(tel:string){
    navigator.clipboard.writeText(tel);
  }
  logoMailClick(mail:string){
    navigator.clipboard.writeText(mail);
  }

  //Rafraichie la page des vacataires quand on annule les modifications pour que la card remète les bonnes valeurs
  reloadPage(){
    window.location.reload()
  }

  hello() {
    console.log(this.cours);

  }
}
