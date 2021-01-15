import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularGrammarsComponent } from './regular-grammars.component';

describe('RegularGrammarsComponent', () => {
  let component: RegularGrammarsComponent;
  let fixture: ComponentFixture<RegularGrammarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegularGrammarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularGrammarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
