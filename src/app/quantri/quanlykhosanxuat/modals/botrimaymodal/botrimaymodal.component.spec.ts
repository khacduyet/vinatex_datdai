import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotrimaymodalComponent } from './botrimaymodal.component';

describe('BotrimaymodalComponent', () => {
  let component: BotrimaymodalComponent;
  let fixture: ComponentFixture<BotrimaymodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotrimaymodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotrimaymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
