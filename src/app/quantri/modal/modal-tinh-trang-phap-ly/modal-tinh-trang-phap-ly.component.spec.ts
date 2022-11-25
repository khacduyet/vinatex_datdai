import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTinhTrangPhapLyComponent } from './modal-tinh-trang-phap-ly.component';

describe('ModalTinhTrangPhapLyComponent', () => {
  let component: ModalTinhTrangPhapLyComponent;
  let fixture: ComponentFixture<ModalTinhTrangPhapLyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTinhTrangPhapLyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTinhTrangPhapLyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
