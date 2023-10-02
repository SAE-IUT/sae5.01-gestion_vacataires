import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VacatairesComponent } from './pages/vacataires/vacataires.component';
import { LesCoursComponent } from './pages/modules/les-cours.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { CoursComponent } from './components/cours/cours.component';
import { HttpClientModule } from '@angular/common/http';
import { LeVacataireComponent } from './components/le-vacataire/le-vacataire.component';
import { FormsModule } from '@angular/forms';
import { ConnexionComponent } from './src/app/pages/connexion/connexion.component';

@NgModule({
  declarations: [
    AppComponent,
    VacatairesComponent,
    LesCoursComponent,
    NotFoundComponent,
    AccueilComponent,
    CoursComponent,
    LeVacataireComponent,
    ConnexionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
