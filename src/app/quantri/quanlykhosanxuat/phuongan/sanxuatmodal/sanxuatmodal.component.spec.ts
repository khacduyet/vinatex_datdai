import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SanxuatmodalComponent } from './sanxuatmodal.component';

describe('SanxuatmodalComponent', () => {
  let component: SanxuatmodalComponent;
  let fixture: ComponentFixture<SanxuatmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SanxuatmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SanxuatmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
