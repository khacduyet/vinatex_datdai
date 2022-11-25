import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KehoachnhapnguyenlieuitemmodalComponent } from './kehoachnhapnguyenlieuitemmodal.component';

describe('KehoachnhapnguyenlieuitemmodalComponent', () => {
  let component: KehoachnhapnguyenlieuitemmodalComponent;
  let fixture: ComponentFixture<KehoachnhapnguyenlieuitemmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KehoachnhapnguyenlieuitemmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KehoachnhapnguyenlieuitemmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
