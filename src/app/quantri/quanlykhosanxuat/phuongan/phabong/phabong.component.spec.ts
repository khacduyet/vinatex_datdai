import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhabongComponent } from './phabong.component';

describe('PhabongComponent', () => {
  let component: PhabongComponent;
  let fixture: ComponentFixture<PhabongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhabongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhabongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
