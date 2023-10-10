import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ModulesService } from 'src/app/services/modules.service';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import Module from 'src/app/interfaces/module-interface';
import Filter from 'src/app/interfaces/filtre-interface';

@Component({
  selector: 'app-les-cours',
  templateUrl: './les-cours.component.html',
  styleUrls: ['./les-cours.component.css'],
})
export class LesCoursComponent {

  public modules: Module[] = []; // Liste des cours

  public filtres: Filter = {}; // Filtres actifs

  public matieres: string[] = []; // Liste des matières
  public departements: string[] = []; // Liste des départements

  public currentSearch: string | null = null; // Dernière recherche saisie
  private searchTimeout: number | null = null;

  form = {
    name : "",
    name_reduit: "",
    color_hexa: "",
    departement: [""],
    matiere: ""
  }

  constructor(
    private modulesService: ModulesService,
    private route: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit() {
    this.modulesService.getModule().subscribe((data: unknown) => {
      this.modules = data as Module[];
    });
    
    // Récupération des matières et des départements distincts
    for (const c of this.modules) {
      if (!this.matieres.includes(c.matiere)) {
        this.matieres.push(c.matiere);
      }
      for (const departement of c.departement) {
        if (!this.departements.includes(departement.toUpperCase())) {
          this.departements.push(departement.toUpperCase());
        }
      }
    }

    // Remplissage des filtres actifs à partir des query params
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.filtres = {};
      for (const param of params.keys) {
        this.filtres[param] = params.get(param) ?? '';
      }
      this.currentSearch = this.route.snapshot.queryParamMap.get('search');
    });
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
          ['/les-cours'],
          {
            queryParams: { search: newSearch ? newSearch : null },
            queryParamsHandling: 'merge',
            replaceUrl: true,
          },
        );
      }
    }, 750);
  }

  /**
   * Vérifie si le filtre est actif
   * @param category Filtre à vérifier
   * @returns boolean
   */
  isFiltered(category: string) {
    return Object.hasOwn(this.filtres, category);
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
}
