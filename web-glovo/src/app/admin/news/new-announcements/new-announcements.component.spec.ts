import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAnnouncementsComponent } from './new-announcements.component';

describe('NewAnnouncementsComponent', () => {
  let component: NewAnnouncementsComponent;
  let fixture: ComponentFixture<NewAnnouncementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAnnouncementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
