import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VacatairesComponent } from './vacataires.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ListeVacatairesComponent } from 'src/app/components/liste-vacataires/liste-vacataires.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { VacatairesService } from 'src/app/services/vacataires.service';

describe('VacatairesComponent', () => {
  let component: VacatairesComponent;
  let fixture: ComponentFixture<VacatairesComponent>;

  beforeEach(async() => {
     TestBed.configureTestingModule({
      declarations: [VacatairesComponent,ListeVacatairesComponent],
      imports: [HttpClientTestingModule,FormsModule,BrowserModule,RouterModule],
      providers: [
        VacatairesService,
        { provide: ActivatedRoute, useValue: {} } // Fournir un objet vide pour l'ActivatedRoute
      ]
    });
    fixture = TestBed.createComponent(VacatairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Vérification du nombre de vacataire', () => {
    const httpTestingController = TestBed.inject(HttpTestingController);
    const req = httpTestingController.expectOne('/api/vacataires');
    expect(req.request.method).toEqual('GET');
    req.flush([
      {     name: 'Marcel',
      lastName: 'Marcel',
      phone: '0631',
      email: 'm@m.fr',
      github: 'marcelmarcel',
      skills: ['angular'],
      _id: '1',
      modules: ['Math'],
      status: 'en attente'},
      {     name: 'BON',
      lastName: 'NOB',
      phone: '0631',
      email: 'm@m.fr',
      github: 'marcBNBNBNBNBNBNBNelmarcel',
      skills: ['angular'],
      _id: '2',
      modules: ['Math'],
      status: 'en attente'}
    ]);

    fixture.detectChanges();
    expect(component.vacataires.length).toEqual(2);
  });
  it('Ajouter un vacataire', () => {
    const fixture = TestBed.createComponent(VacatairesComponent); // Créez le composant
    const component = fixture.componentInstance; // Accédez à l'instance du composant
  
    // Simulez la réponse de la requête HTTP
    const httpTestingController = TestBed.inject(HttpTestingController);
    const req = httpTestingController.expectOne('/api/vacataires/newVacataire');
    expect(req.request.method).toEqual('POST');
    const responseData = { id: 3, name: 'rr', lastName: 'f', phone: 'rr', email: 'rr', github: 'rr', skills: 'rr' };
    req.flush(responseData);
  
    // Appelez la méthode pour ajouter un vacataire
    component.addVacataire('rr', 'f', 'rr', 'rr', 'rr', 'rr');
  
    // Attendez la réponse de la requête POST
    httpTestingController.verify();
  
    // Maintenant, vous pouvez vérifier que le nombre de vacataires a été mis à jour
    expect(component.vacataires.length).toEqual(3); // Si l'ajout est réussi, le nombre devrait être mis à jour
  });
  
});
