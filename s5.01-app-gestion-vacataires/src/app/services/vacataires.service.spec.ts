import { TestBed } from '@angular/core/testing';

import { VacatairesService } from './vacataires.service';

describe('VacatairesService', () => {
  let service: VacatairesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacatairesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
