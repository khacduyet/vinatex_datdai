import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotrimayOngComponent } from './botrimay-ong.component';

describe('BotrimayOngComponent', () => {
  let component: BotrimayOngComponent;
  let fixture: ComponentFixture<BotrimayOngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotrimayOngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotrimayOngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
