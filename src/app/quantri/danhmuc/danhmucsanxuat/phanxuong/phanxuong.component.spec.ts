import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhanxuongComponent } from './phanxuong.component';

describe('PhanxuongComponent', () => {
  let component: PhanxuongComponent;
  let fixture: ComponentFixture<PhanxuongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhanxuongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhanxuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
