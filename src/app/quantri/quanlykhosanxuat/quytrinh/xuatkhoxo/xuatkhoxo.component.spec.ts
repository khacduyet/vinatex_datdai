import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatkhoxoComponent } from './xuatkhoxo.component';

describe('XuatkhoxoComponent', () => {
  let component: XuatkhoxoComponent;
  let fixture: ComponentFixture<XuatkhoxoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhoxoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhoxoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
