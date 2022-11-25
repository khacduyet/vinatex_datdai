import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinhtrangtaisanComponent } from './tinhtrangtaisan.component';

describe('TinhtrangtaisanComponent', () => {
  let component: TinhtrangtaisanComponent;
  let fixture: ComponentFixture<TinhtrangtaisanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinhtrangtaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinhtrangtaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
