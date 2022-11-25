import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasanxuatComponent } from './casanxuat.component';

describe('CasanxuatComponent', () => {
  let component: CasanxuatComponent;
  let fixture: ComponentFixture<CasanxuatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasanxuatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasanxuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
