import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinhmuctieuchichatluongsoiComponent } from './dinhmuctieuchichatluongsoi.component';

describe('DinhmuctieuchichatluongsoiComponent', () => {
  let component: DinhmuctieuchichatluongsoiComponent;
  let fixture: ComponentFixture<DinhmuctieuchichatluongsoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinhmuctieuchichatluongsoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinhmuctieuchichatluongsoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
