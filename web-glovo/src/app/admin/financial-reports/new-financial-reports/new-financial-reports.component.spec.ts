import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFinancialReportsComponent } from './new-financial-reports.component';

describe('NewFinancialReportsComponent', () => {
  let component: NewFinancialReportsComponent;
  let fixture: ComponentFixture<NewFinancialReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFinancialReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFinancialReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
