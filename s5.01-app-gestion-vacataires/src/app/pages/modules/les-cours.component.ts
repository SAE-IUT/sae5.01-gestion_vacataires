import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
  selector: 'app-les-cours',
  templateUrl: './les-cours.component.html',
  styleUrls: ['./les-cours.component.css'],
})
export class LesCoursComponent {

  public cours: Module[] = [];

  public matieres: string[] = [];
  public departements: string[] = [];
  public filtres: Filter = {};

  public currentSearch: string | null = null;
  private searchTimeout: number | null = null;

  constructor(
    private modulesService: ModulesService,
    private route: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit() {
    this.modulesService.getModule().subscribe((data: unknown) => {
      this.cours = data as Module[];
    });
    
    // const data = [
    //   {
    //     _id: '2125',
    //     name: 'SAE5',
    //     name_reduit: 'SAE',
    //     color_hexa: '#115588',
    //     departement: ['info'],
    //     matiere: 'SAE',
    //   },
    //   {
    //     _id: '21255',
    //     name: 'Anglais',
    //     name_reduit: 'ENG',
    //     color_hexa: '#558811',
    //     departement: ['info', 'rt', 'gmi', 'cs'],
    //     matiere: 'Anglais',
    //   },
    //   {
    //     _id: '212552',
    //     name: 'Base de données',
    //     name_reduit: 'BDD',
    //     color_hexa: '#881155',
    //     departement: ['info'],
    //     matiere: 'Développement',
    //   }
    // ];

    // this.cours = data;
    
    for (const c of this.cours) {
      if (!this.matieres.includes(c.matiere)) {
        this.matieres.push(c.matiere);
      }
      for (const departement of c.departement) {
        if (!this.departements.includes(departement.toUpperCase())) {
          this.departements.push(departement.toUpperCase());
        }
      }
    }

    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.filtres = {};
      for (const param of params.keys) {
        this.filtres[param] = params.get(param);
      }
      this.currentSearch = this.route.snapshot.queryParamMap.get('name');
    });
  }

  search(e: Event) {
    const newSearch = (<HTMLInputElement>e.target).value;

    if (this.searchTimeout) clearTimeout(this.searchTimeout);

    this.searchTimeout = window.setTimeout(() => {
      if (newSearch !== this.currentSearch) {
        this.router.navigate(
          ['/les-cours'],
          {
            queryParams: { name: newSearch ? newSearch : null },
            queryParamsHandling: 'merge',
            replaceUrl: true,
          },
        );
      }
    }, 750);
  }

  isFiltered(category: string) {
    return Object.hasOwn(this.filtres, category);
  }
  
}
