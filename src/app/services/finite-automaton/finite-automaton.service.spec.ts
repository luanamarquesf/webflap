import { TestBed } from '@angular/core/testing';

import { FiniteAutomatonService } from './finite-automaton.service';

describe('FiniteAutomatonService', () => {
  let service: FiniteAutomatonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiniteAutomatonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
