import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuytrinhsapxepComponent } from './quytrinhsapxep.component';

describe('QuytrinhsapxepComponent', () => {
  let component: QuytrinhsapxepComponent;
  let fixture: ComponentFixture<QuytrinhsapxepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuytrinhsapxepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuytrinhsapxepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
