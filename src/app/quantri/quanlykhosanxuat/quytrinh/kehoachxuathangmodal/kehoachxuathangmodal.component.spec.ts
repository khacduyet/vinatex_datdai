import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KehoachxuathangmodalComponent } from './kehoachxuathangmodal.component';

describe('KehoachxuathangmodalComponent', () => {
  let component: KehoachxuathangmodalComponent;
  let fixture: ComponentFixture<KehoachxuathangmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KehoachxuathangmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KehoachxuathangmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
