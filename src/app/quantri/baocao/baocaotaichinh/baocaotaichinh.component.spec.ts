import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaocaotaichinhComponent } from './baocaotaichinh.component';

describe('BaocaotaichinhComponent', () => {
  let component: BaocaotaichinhComponent;
  let fixture: ComponentFixture<BaocaotaichinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaocaotaichinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaocaotaichinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
