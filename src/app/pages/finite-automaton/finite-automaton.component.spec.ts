import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiniteAutomatonComponent } from './finite-automaton.component';

describe('FiniteAutomatonComponent', () => {
  let component: FiniteAutomatonComponent;
  let fixture: ComponentFixture<FiniteAutomatonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiniteAutomatonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiniteAutomatonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
