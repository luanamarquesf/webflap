import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularExpressionsViewComponent } from './regular-expressions-view.component';

describe('RegularExpressionsViewComponent', () => {
  let component: RegularExpressionsViewComponent;
  let fixture: ComponentFixture<RegularExpressionsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegularExpressionsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularExpressionsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
