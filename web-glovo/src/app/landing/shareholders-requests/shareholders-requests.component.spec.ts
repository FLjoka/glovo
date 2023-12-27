import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareholdersRequestsComponent } from './shareholders-requests.component';

describe('ShareholdersRequestsComponent', () => {
  let component: ShareholdersRequestsComponent;
  let fixture: ComponentFixture<ShareholdersRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareholdersRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareholdersRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
