import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnnouncementsComponent } from './edit-announcements.component';

describe('EditAnnouncementsComponent', () => {
  let component: EditAnnouncementsComponent;
  let fixture: ComponentFixture<EditAnnouncementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAnnouncementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
