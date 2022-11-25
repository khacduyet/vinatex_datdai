import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlytaisannhadatComponent } from './quanlytaisannhadat.component';

describe('QuanlytaisannhadatComponent', () => {
  let component: QuanlytaisannhadatComponent;
  let fixture: ComponentFixture<QuanlytaisannhadatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanlytaisannhadatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanlytaisannhadatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
