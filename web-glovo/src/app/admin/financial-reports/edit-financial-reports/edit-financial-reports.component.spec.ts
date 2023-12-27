import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFinancialReportsComponent } from './edit-financial-reports.component';

describe('EditFinancialReportsComponent', () => {
  let component: EditFinancialReportsComponent;
  let fixture: ComponentFixture<EditFinancialReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFinancialReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFinancialReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
