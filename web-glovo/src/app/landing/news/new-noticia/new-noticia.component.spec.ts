import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNoticiaComponent } from './new-noticia.component';

describe('NewNoticiaComponent', () => {
  let component: NewNoticiaComponent;
  let fixture: ComponentFixture<NewNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewNoticiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
