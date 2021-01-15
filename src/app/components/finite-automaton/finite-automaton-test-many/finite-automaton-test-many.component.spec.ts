import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiniteAutomatonTestManyComponent } from './finite-automaton-test-many.component';

describe('FiniteAutomatonTestManyComponent', () => {
  let component: FiniteAutomatonTestManyComponent;
  let fixture: ComponentFixture<FiniteAutomatonTestManyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiniteAutomatonTestManyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiniteAutomatonTestManyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
