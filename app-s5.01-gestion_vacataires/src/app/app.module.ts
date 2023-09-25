import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VacataireComponent } from './components/vacataire/vacataire.component';
import { CoursComponent } from './components/cours/cours.component';
import { VacatairesComponent } from './pages/vacataires/vacataires.component';
import { LesCoursComponent } from './pages/les-cours/les-cours.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { TestsComponent } from './components/tests/tests.component';
import { FormsModule } from '@angular/forms';
import { Test2Component } from './test2/test2.component';

@NgModule({
  declarations: [
    AppComponent,
    VacataireComponent,
    CoursComponent,
    VacatairesComponent,
    LesCoursComponent,
    AccueilComponent,
    NotFoundComponent,
    TestsComponent,
    Test2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
