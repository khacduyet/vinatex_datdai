import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongKeThongTinThuaDatComponent } from './thong-ke-thong-tin-thua-dat.component';

describe('ThongKeThongTinThuaDatComponent', () => {
  let component: ThongKeThongTinThuaDatComponent;
  let fixture: ComponentFixture<ThongKeThongTinThuaDatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongKeThongTinThuaDatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongKeThongTinThuaDatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
