import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeVacataireComponent } from './le-vacataire.component';

describe('LeVacataireComponent', () => {
  let component: LeVacataireComponent;
  let fixture: ComponentFixture<LeVacataireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeVacataireComponent]
    });
    fixture = TestBed.createComponent(LeVacataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
