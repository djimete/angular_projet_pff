import { TestBed } from '@angular/core/testing';

import { PrestatairesService } from './prestataires.service';

describe('PrestatairesService', () => {
  let service: PrestatairesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestatairesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
