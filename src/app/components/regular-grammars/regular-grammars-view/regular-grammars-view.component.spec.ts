import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularGrammarsViewComponent } from './regular-grammars-view.component';

describe('RegularGrammarsViewComponent', () => {
  let component: RegularGrammarsViewComponent;
  let fixture: ComponentFixture<RegularGrammarsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegularGrammarsViewComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularGrammarsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
