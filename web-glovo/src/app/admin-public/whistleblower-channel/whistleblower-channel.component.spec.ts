import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhistleblowerChannelComponent } from './whistleblower-channel.component';

describe('WhistleblowerChannelComponent', () => {
  let component: WhistleblowerChannelComponent;
  let fixture: ComponentFixture<WhistleblowerChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhistleblowerChannelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhistleblowerChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
