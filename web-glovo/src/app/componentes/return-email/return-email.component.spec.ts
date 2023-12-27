import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnEmailComponent } from './return-email.component';

describe('ReturnEmailComponent', () => {
  let component: ReturnEmailComponent;
  let fixture: ComponentFixture<ReturnEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
