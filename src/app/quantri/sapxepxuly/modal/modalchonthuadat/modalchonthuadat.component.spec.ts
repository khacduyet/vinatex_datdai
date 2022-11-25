import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalchonthuadatComponent } from './modalchonthuadat.component';

describe('ModalchonthuadatComponent', () => {
  let component: ModalchonthuadatComponent;
  let fixture: ComponentFixture<ModalchonthuadatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalchonthuadatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalchonthuadatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
