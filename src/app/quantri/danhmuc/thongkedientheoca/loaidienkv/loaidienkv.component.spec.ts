import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaidienkvComponent } from './loaidienkv.component';

describe('LoaidienkvComponent', () => {
  let component: LoaidienkvComponent;
  let fixture: ComponentFixture<LoaidienkvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaidienkvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaidienkvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
