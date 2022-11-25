import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhanquyentheophanxuongComponent } from './phanquyentheophanxuong.component';

describe('PhanquyentheophanxuongComponent', () => {
  let component: PhanquyentheophanxuongComponent;
  let fixture: ComponentFixture<PhanquyentheophanxuongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhanquyentheophanxuongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhanquyentheophanxuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
