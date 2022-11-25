import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhucauxuathangComponent } from './nhucauxuathang.component';

describe('NhucauxuathangComponent', () => {
  let component: NhucauxuathangComponent;
  let fixture: ComponentFixture<NhucauxuathangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhucauxuathangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhucauxuathangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
