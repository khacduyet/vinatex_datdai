import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalthongbaoComponent } from './modalthongbao.component';

describe('ModalthongbaoComponent', () => {
  let component: ModalthongbaoComponent;
  let fixture: ComponentFixture<ModalthongbaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalthongbaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalthongbaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
