import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { VacatairesComponent } from './pages/vacataires/vacataires.component';
import { LesCoursComponent } from './pages/les-cours/les-cours.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path : '', component: AccueilComponent },
  { path: 'vacataires', component:VacatairesComponent },
  { path: 'les-cours', component:LesCoursComponent },
  { path: '404', component:NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
