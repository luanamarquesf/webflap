import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularExpressionsTestComponent } from './regular-expressions-test.component';

describe('RegularExpressionsTestComponent', () => {
  let component: RegularExpressionsTestComponent;
  let fixture: ComponentFixture<RegularExpressionsTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegularExpressionsTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularExpressionsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
