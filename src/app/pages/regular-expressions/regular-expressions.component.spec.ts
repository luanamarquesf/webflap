import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularExpressionsComponent } from './regular-expressions.component';

describe('RegularExpressionsComponent', () => {
  let component: RegularExpressionsComponent;
  let fixture: ComponentFixture<RegularExpressionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegularExpressionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularExpressionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
