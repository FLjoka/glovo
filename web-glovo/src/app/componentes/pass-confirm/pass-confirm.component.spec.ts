import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassConfirmComponent } from './pass-confirm.component';

describe('PassConfirmComponent', () => {
  let component: PassConfirmComponent;
  let fixture: ComponentFixture<PassConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
