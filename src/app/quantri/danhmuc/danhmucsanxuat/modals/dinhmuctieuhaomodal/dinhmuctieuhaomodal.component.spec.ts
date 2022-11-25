import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinhmuctieuhaomodalComponent } from './dinhmuctieuhaomodal.component';

describe('DinhmuctieuhaomodalComponent', () => {
  let component: DinhmuctieuhaomodalComponent;
  let fixture: ComponentFixture<DinhmuctieuhaomodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinhmuctieuhaomodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinhmuctieuhaomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
