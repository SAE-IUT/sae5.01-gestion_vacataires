import { Component } from '@angular/core';
import { VacatairesService } from 'src/app/services/vacataires.service';

@Component({
  selector: 'app-vacataires',
  templateUrl: './vacataires.component.html',
  styleUrls: ['./vacataires.component.css']
})
export class VacatairesComponent {

  public vacataires: any[] = []

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

  constructor(private vacatairesService: VacatairesService) {}

  ngOnInit() {
    this.vacatairesService.getVacataire().subscribe((data: any) => {
      this.vacataires = data;               
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

}
