import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlovoMenuComponent } from './glovo-menu.component';

describe('GlovoMenuComponent', () => {
  let component: GlovoMenuComponent;
  let fixture: ComponentFixture<GlovoMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlovoMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlovoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
