import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeVacatairesComponent } from './liste-vacataires.component';

describe('ListeVacatairesComponent', () => {
  let component: ListeVacatairesComponent;
  let fixture: ComponentFixture<ListeVacatairesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeVacatairesComponent]
    });
    fixture = TestBed.createComponent(ListeVacatairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
