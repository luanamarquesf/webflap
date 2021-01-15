import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularGrammarsTestManyComponent } from './regular-grammars-test-many.component';

describe('RegularGrammarsTestManyComponent', () => {
  let component: RegularGrammarsTestManyComponent;
  let fixture: ComponentFixture<RegularGrammarsTestManyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegularGrammarsTestManyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularGrammarsTestManyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
