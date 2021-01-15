import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiniteAutomatonViewComponent } from './finite-automaton-view.component';

describe('FiniteAutomatonViewComponent', () => {
  let component: FiniteAutomatonViewComponent;
  let fixture: ComponentFixture<FiniteAutomatonViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiniteAutomatonViewComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiniteAutomatonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
