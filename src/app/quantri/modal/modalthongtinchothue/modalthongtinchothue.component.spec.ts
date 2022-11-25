import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalthongtinchothueComponent } from './modalthongtinchothue.component';

describe('ModalthongtinchothueComponent', () => {
  let component: ModalthongtinchothueComponent;
  let fixture: ComponentFixture<ModalthongtinchothueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalthongtinchothueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalthongtinchothueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
