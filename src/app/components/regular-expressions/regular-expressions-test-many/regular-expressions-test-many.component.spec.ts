import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularExpressionsTestManyComponent } from './regular-expressions-test-many.component';

describe('RegularExpressionsTestManyComponent', () => {
  let component: RegularExpressionsTestManyComponent;
  let fixture: ComponentFixture<RegularExpressionsTestManyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegularExpressionsTestManyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularExpressionsTestManyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
