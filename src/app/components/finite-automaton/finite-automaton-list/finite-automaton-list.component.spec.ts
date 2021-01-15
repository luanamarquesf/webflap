import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiniteAutomatonListComponent } from './finite-automaton-list.component';

describe('FiniteAutomatonListComponent', () => {
  let component: FiniteAutomatonListComponent;
  let fixture: ComponentFixture<FiniteAutomatonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiniteAutomatonListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiniteAutomatonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
