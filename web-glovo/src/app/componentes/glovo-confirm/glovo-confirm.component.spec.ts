import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlovoConfirmComponent } from './glovo-confirm.component';

describe('GlovoConfirmComponent', () => {
  let component: GlovoConfirmComponent;
  let fixture: ComponentFixture<GlovoConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlovoConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlovoConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
