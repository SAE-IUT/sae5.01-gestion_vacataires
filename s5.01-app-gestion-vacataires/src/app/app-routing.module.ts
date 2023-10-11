import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VacatairesComponent } from './pages/vacataires/vacataires.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { CoursComponent } from './pages/cours/cours.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ConnectionComponent } from './pages/connection/connection.component';
import {ProfilComponent} from "./pages/profil/profil.component";

const routes: Routes = [
  { path : '', component: VacatairesComponent },
  { path : 'accueil', component: AccueilComponent },
  { path : 'connexion', component: ConnectionComponent },
  { path: 'vacataires', component:VacatairesComponent },
  { path: 'cours', component:CoursComponent },
  { path: 'profile', component:ProfilComponent },
  { path: '404', component:NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
