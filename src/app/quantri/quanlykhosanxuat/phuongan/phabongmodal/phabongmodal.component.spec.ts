import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhabongmodalComponent } from './phabongmodal.component';

describe('PhabongmodalComponent', () => {
  let component: PhabongmodalComponent;
  let fixture: ComponentFixture<PhabongmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhabongmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhabongmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
