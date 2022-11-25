import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmnhomcongtoComponent } from './dmnhomcongto.component';

describe('DmnhomcongtoComponent', () => {
  let component: DmnhomcongtoComponent;
  let fixture: ComponentFixture<DmnhomcongtoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmnhomcongtoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmnhomcongtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
