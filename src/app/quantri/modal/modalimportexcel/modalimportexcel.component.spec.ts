import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalimportexcelComponent } from './modalimportexcel.component';

describe('ModalimportexcelComponent', () => {
  let component: ModalimportexcelComponent;
  let fixture: ComponentFixture<ModalimportexcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalimportexcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalimportexcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
