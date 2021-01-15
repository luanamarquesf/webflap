import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularExpressionsListComponent } from './regular-expressions-list.component';

describe('RegularExpressionsListComponent', () => {
  let component: RegularExpressionsListComponent;
  let fixture: ComponentFixture<RegularExpressionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegularExpressionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularExpressionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
