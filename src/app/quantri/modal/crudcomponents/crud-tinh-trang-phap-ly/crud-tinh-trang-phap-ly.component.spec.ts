import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudTinhTrangPhapLyComponent } from './crud-tinh-trang-phap-ly.component';

describe('CrudTinhTrangPhapLyComponent', () => {
  let component: CrudTinhTrangPhapLyComponent;
  let fixture: ComponentFixture<CrudTinhTrangPhapLyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudTinhTrangPhapLyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudTinhTrangPhapLyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
