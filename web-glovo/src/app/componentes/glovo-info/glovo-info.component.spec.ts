import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlovoInfoComponent } from './glovo-info.component';

describe('GlovoInfoComponent', () => {
  let component: GlovoInfoComponent;
  let fixture: ComponentFixture<GlovoInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlovoInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlovoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
