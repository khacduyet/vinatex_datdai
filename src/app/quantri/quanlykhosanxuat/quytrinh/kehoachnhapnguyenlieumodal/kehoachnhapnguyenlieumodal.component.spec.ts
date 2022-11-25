import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KehoachnhapnguyenlieumodalComponent } from './kehoachnhapnguyenlieumodal.component';

describe('KehoachnhapnguyenlieumodalComponent', () => {
  let component: KehoachnhapnguyenlieumodalComponent;
  let fixture: ComponentFixture<KehoachnhapnguyenlieumodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KehoachnhapnguyenlieumodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KehoachnhapnguyenlieumodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
