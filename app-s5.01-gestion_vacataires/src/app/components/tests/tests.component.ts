import { NonNullAssert } from '@angular/compiler';
import { Component } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent {
  form: any = {
    // identitie: "",
    // name: "",
    // lastName: "",
    // abbreviation: "",
    // department: [] = [],
    // email: "",
    // skills: [] = [],
    // socials: [] = [],
    // status: ""
  }

  constructor(private dataService: DataService) {}

  vacataires: any[] = [];
  
  formData: any[] = []

  ngOnInit(): void {
    this.dataService.getVacataires().subscribe((data: any) => {
      this.vacataires = data.vacataires; // récupère les données des vacataires du fichier JSON et les ajoute dans le tab vacataires[]
    });
    
  }

  // splitData() {
  //   console.log("slipt");
  //   // Vérifiez si form.department existe et n'est pas une chaîne vide
  //   if (this.form.department && this.form.department.trim() !== ''
  //       && this.form.skills && this.form.skills.trim() !== ''
  //       && this.form.socials && this.form.socials.trim() !== '') {

  //     // Utilisez split() pour diviser la chaîne par ';'
  //     this.form.department = this.form.department.split(';');
  //     this.form.skills = this.form.skills.split(';');
  //     this.form.socials = this.form.socials.split(';');

  //   } else {
  //     // Réinitialisez le tableau si la chaîne est vide ou inexistante
  //     this.form.department = [];
  //     this.form.skills = [];
  //     this.form.socials = [];
  //   }
  // }

  onSubmit() {

    console.log(this.form.name);
    



    // let ID: number = 0;
    // this.splitData()

    // for (let index = 0; index < this.vacataires.length; index++) {
    //   const vacataire = this.vacataires[index];
    //   ID = vacataire.id + 1
    // }
            
    // this.formData.push({
    //   ID,
    //   name: this.form.name,
    //   lastName: this.form.lastName,
    //   abbreviation: this.form.abbreviation,
    //   department: this.form.department,
    //   email : this.form.email,
    //   skills: this.form.skills,
    //   socials: this.form.socials,
    //   status: this.form.status
    // })

    // console.log(this.formData);
  
    // this.dataService.createVacataire(this.formData)
    
  }
}

