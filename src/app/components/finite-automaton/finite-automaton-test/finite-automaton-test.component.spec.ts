import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiniteAutomatonTestComponent } from './finite-automaton-test.component';

describe('FiniteAutomatonTestComponent', () => {
  let component: FiniteAutomatonTestComponent;
  let fixture: ComponentFixture<FiniteAutomatonTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiniteAutomatonTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiniteAutomatonTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
