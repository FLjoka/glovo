import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalPrivacyComponent } from './legal-privacy.component';

describe('LegalPrivacyComponent', () => {
  let component: LegalPrivacyComponent;
  let fixture: ComponentFixture<LegalPrivacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalPrivacyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalPrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
