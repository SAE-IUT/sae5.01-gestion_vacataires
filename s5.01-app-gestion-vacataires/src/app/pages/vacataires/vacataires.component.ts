import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { empty } from 'rxjs';
import Filter from 'src/app/interfaces/filtre-interface';
import Vacataire from 'src/app/interfaces/vacataire-interface';
import { VacatairesService } from 'src/app/services/vacataires.service';

@Component({
  selector: 'app-vacataires',
  templateUrl: './vacataires.component.html',
  styleUrls: ['./vacataires.component.css']
})
export class VacatairesComponent {

  public vacataires: Vacataire[] = []; // Liste des vacataires

  public filtres: Filter = {}; // Filtres actifs

  selectedSkill: string = ""; // Ajoutez la variable selectedSkill pour stocker la compétence sélectionnée

  skillsList: string[] = ['Administration réseau', 'Développement Web', 'Gestion de projet', 'Cybersécurité', 'Développement d’applications', 'Communication' , 'Base de données' ];


  public status: string[] = [
    'Affecté',
    'Non Affecté',
    'En Attente',
  ];
  public matieres: string[] = []; // Liste des matières

  public currentSearch: string | null = null; // Dernière recherche saisie
  private searchTimeout: number | null = null;

  form = {
    name : "",
    lastName: "",
    phone: "",
    email: "", 
    github: "",
    skills: [] as string[]
  }

  comp: string[] = [];
  // tags: string[] = [];

  constructor(
    private vacatairesService: VacatairesService,
    private route: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit() {
    this.vacatairesService.getVacataire().subscribe((data: unknown) => {
      this.vacataires = data as Vacataire[];

      // Récupération des matières distinctes
      for (const c of this.vacataires) {
        for (const module of c.modules) {
          if (!this.matieres.includes(module)) {
            this.matieres.push(module);
          }
        }
      }
    });

    // Remplissage des filtres actifs à partir des query params
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.filtres = {};
      for (const param of params.keys) {
        this.filtres[param] = params.get(param) ?? '';
      }
      this.currentSearch = this.route.snapshot.queryParamMap.get('search');
    });
  }

  addSkill(): void {
    if (!this.form.skills) {
      this.form.skills = [];
    }
  
    if (this.selectedSkill!="" && !this.form.skills.includes(this.selectedSkill) ) {
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

  // splitSkills() {
  //   // Vérifiez si form.department existe et n'est pas une chaîne vide
  //   if (this.form.skills && this.form.skills.trim() !== '') {
  //     // Utilisez split() pour diviser la chaîne par des espaces
  //     const newTags = this.form.skills.split(' ');
  
  //     // Ajoutez chaque nouveau tag à la liste des tags
  //     this.tags = [...this.tags, ...newTags];
  
  //     // Effacez le champ d'entrée
  //     this.form.skills = '';
  //   }
  // }

  // removeTag(tag: string) {
  //   this.tags = this.tags.filter(t => t !== tag);
  // }
  

  addVacataire(name: string, lastName: string, phone: string, email: string, github: string, skills: string[]) {

    console.log(
      "name : " + name + "\n" +
      "lastName : " + lastName +
      "Phone : " + phone + "\n" +
      "email : " + email + "\n" +
      "github : " + github + "\n" +
      "skills : " + skills + "\n" 
    );
    skills = skills.filter(el => el!=="")
    this.vacatairesService.addVacataire(name, lastName, phone, email, github, skills).subscribe({
      next: (response) => {
        window.location.reload()
      },
      error: (error) => {
        // Gestion des erreurs
        console.error(error);
      },
      complete: () => {
      }
    })

  }

  hello(value: string) {
    console.log(typeof(value));
      
  }

  /**
   * Vérifie si le filtre est actif
   * @param category Filtre à vérifier
   * @returns boolean
   */
  isFiltered(category: string) {
    return Object.hasOwn(this.filtres, category);
  }

  /**
   * Gère la recherche :
   * - valide une recherche 0.75s après la saisie si elle est différente de la précédente
   * - modification du query param "search"
   * @param e
   */
  search(e: Event) {
    const newSearch = (<HTMLInputElement>e.target).value; // valeur saisie

    if (this.searchTimeout) clearTimeout(this.searchTimeout);

    this.searchTimeout = window.setTimeout(() => {
      if (newSearch !== this.currentSearch) {
        this.router.navigate(
          ['/vacataires'],
          {
            queryParams: { search: newSearch ? newSearch : null },
            queryParamsHandling: 'merge',
            replaceUrl: true,
          },
        );
      }
    }, 750);
  }

}
