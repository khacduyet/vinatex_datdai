import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KehoachnhapnguyenlieuComponent } from './kehoachnhapnguyenlieu.component';

describe('KehoachnhapnguyenlieuComponent', () => {
  let component: KehoachnhapnguyenlieuComponent;
  let fixture: ComponentFixture<KehoachnhapnguyenlieuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KehoachnhapnguyenlieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KehoachnhapnguyenlieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
