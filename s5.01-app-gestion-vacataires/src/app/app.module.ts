import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VacatairesComponent } from './pages/vacataires/vacataires.component';
import { CoursComponent } from './pages/cours/cours.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ListeCoursComponent } from './components/liste-cours/liste-cours.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ListeVacatairesComponent } from './components/liste-vacataires/liste-vacataires.component';
import { FormsModule } from '@angular/forms';
import { ConnectionComponent } from './pages/connection/connection.component';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { ProfilComponent } from './pages/profil/profil.component';

@NgModule({
  declarations: [
    AppComponent,
    VacatairesComponent,
    CoursComponent,
    NotFoundComponent,
    AccueilComponent,
    ListeCoursComponent,
    ListeVacatairesComponent,
    ConnectionComponent,
    ProfilComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
