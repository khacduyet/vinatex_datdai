import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SanxuatComponent } from './sanxuat.component';

describe('SanxuatComponent', () => {
  let component: SanxuatComponent;
  let fixture: ComponentFixture<SanxuatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SanxuatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SanxuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
