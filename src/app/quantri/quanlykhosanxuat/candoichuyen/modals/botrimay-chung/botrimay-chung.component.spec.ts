import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotrimayChungComponent } from './botrimay-chung.component';

describe('BotrimayChungComponent', () => {
  let component: BotrimayChungComponent;
  let fixture: ComponentFixture<BotrimayChungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotrimayChungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotrimayChungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
