import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatkhoComponent } from './xuatkho.component';

describe('XuatkhoComponent', () => {
  let component: XuatkhoComponent;
  let fixture: ComponentFixture<XuatkhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
