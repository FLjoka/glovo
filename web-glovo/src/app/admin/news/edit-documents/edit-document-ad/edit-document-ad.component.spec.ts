import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDocumentAdComponent } from './edit-document-ad.component';

describe('EditDocumentAdComponent', () => {
  let component: EditDocumentAdComponent;
  let fixture: ComponentFixture<EditDocumentAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDocumentAdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDocumentAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
