import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularGrammarsListComponent } from './regular-grammars-list.component';

describe('RegularGrammarsListComponent', () => {
  let component: RegularGrammarsListComponent;
  let fixture: ComponentFixture<RegularGrammarsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegularGrammarsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularGrammarsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
