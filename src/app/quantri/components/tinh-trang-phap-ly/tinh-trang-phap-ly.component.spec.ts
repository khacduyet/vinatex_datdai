import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinhTrangPhapLyComponent } from './tinh-trang-phap-ly.component';

describe('TinhTrangPhapLyComponent', () => {
  let component: TinhTrangPhapLyComponent;
  let fixture: ComponentFixture<TinhTrangPhapLyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinhTrangPhapLyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinhTrangPhapLyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
