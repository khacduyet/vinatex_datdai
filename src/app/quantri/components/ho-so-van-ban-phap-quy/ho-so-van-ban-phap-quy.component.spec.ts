import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoSoVanBanPhapQuyComponent } from './ho-so-van-ban-phap-quy.component';

describe('HoSoVanBanPhapQuyComponent', () => {
  let component: HoSoVanBanPhapQuyComponent;
  let fixture: ComponentFixture<HoSoVanBanPhapQuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoSoVanBanPhapQuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoSoVanBanPhapQuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
