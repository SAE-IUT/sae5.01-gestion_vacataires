import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LesCoursComponent } from './les-cours.component';

describe('LesCoursComponent', () => {
  let component: LesCoursComponent;
  let fixture: ComponentFixture<LesCoursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LesCoursComponent]
    });
    fixture = TestBed.createComponent(LesCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
