import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GloboSelectComponent } from './globo-select.component';

describe('GloboSelectComponent', () => {
  let component: GloboSelectComponent;
  let fixture: ComponentFixture<GloboSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GloboSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GloboSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
