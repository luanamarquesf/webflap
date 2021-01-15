import { TestBed } from '@angular/core/testing';

import { RegularGrammarsService } from './regular-grammars.service';

describe('RegularGrammarsService', () => {
  let service: RegularGrammarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegularGrammarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
