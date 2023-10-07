import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
  selector: 'app-vacataires',
  templateUrl: './vacataires.component.html',
  styleUrls: ['./vacataires.component.css']
})
export class VacatairesComponent {

  public vacataires: Vacataire[] = []

  public filtres: Filter = {};
  public status: string[] = [
    'Affecté',
    'Non Affecté',
    'En Attente',
  ];
  public matieres: string[] = [];

  public currentSearch: string | null = null;
  private searchTimeout: number | null = null;

  form = {
    name : "",
    lastName: "",
    phone: "",
    email: "", 
    github: "",
    skills: ""
  }

  comp: string[] = [];
  // tags: string[] = [];

  constructor(
    private vacatairesService: VacatairesService,
    private route: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit() {
    // this.vacatairesService.getVacataire().subscribe((data: any) => {
    //   this.vacataires = data;               
    // });

    const data = [
      {
        _id: '255',
        name: 'Chris',
        lastName: 'Pratt',
        phone: '+33 6 85 25 10 02',
        email: 'chris.pratt@gmail.com',
        github: 'github.com/chris',
        skills: ['strong', 'nice'],
        modules: ['Anglais', 'Base de données'],
        status: 'Affecté',
      },
      {
        _id: '2551',
        name: 'Prok',
        lastName: 'Praker',
        phone: '+33 6 43 65 78 40',
        email: 'prok.praker@gmail.com',
        github: 'github.com/ppork',
        skills: ['strong', 'neighborhood'],
        modules: ['SAE', 'Base de données'],
        status: 'Non Affecté',
      },
    ];

    this.vacataires = data;

    for (const c of this.vacataires) {
      // if (!this.matieres.includes(c.matiere)) {
      //   this.matieres.push(c.matiere);
      // }
      for (const module of c.modules) {
        if (!this.matieres.includes(module)) {
          this.matieres.push(module);
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

  splitSkills() {
    // Vérifiez si form.department existe et n'est pas une chaîne vide
    if (this.form.skills && this.form.skills.trim() !== '') {
      // Utilisez split() pour diviser la chaîne par ';'
      this.comp = this.form.skills.split(' ');
    } else {
      // Réinitialisez le tableau si la chaîne est vide ou inexistante
      this.comp = [];
    }
  }

  removeSkill(skill: string) {
    // Supprimez la compétence du tableau
    const index = this.comp.indexOf(skill);
    if (index !== -1) {
      this.comp.splice(index, 1);
      // Mettez à jour la chaîne de compétences dans le formulaire
      this.form.skills = this.comp.join(' ');
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
  

  addVacataire(name: string, lastName: string, phone: string, email: string, github: string, skills: string) {

    console.log(
      "name : " + name + "\n" +
      "lastName : " + lastName +
      "Phone : " + phone + "\n" +
      "email : " + email + "\n" +
      "github : " + github + "\n" +
      "skills : " + skills + "\n" 
    );

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

  isFiltered(category: string) {
    return Object.hasOwn(this.filtres, category);
  }

  search(e: Event) {
    const newSearch = (<HTMLInputElement>e.target).value;

    if (this.searchTimeout) clearTimeout(this.searchTimeout);

    this.searchTimeout = window.setTimeout(() => {
      if (newSearch !== this.currentSearch) {
        this.router.navigate(
          ['/vacataires'],
          {
            queryParams: { name: newSearch ? newSearch : null },
            queryParamsHandling: 'merge',
            replaceUrl: true,
          },
        );
      }
    }, 750);
  }

}
