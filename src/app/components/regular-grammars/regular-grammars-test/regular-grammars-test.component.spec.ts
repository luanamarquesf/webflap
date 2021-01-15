import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularGrammarsTestComponent } from './regular-grammars-test.component';

describe('RegularGrammarsTestComponent', () => {
  let component: RegularGrammarsTestComponent;
  let fixture: ComponentFixture<RegularGrammarsTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegularGrammarsTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularGrammarsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
