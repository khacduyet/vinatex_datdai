import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YeucausapxepComponent } from './yeucausapxep.component';

describe('YeucausapxepComponent', () => {
  let component: YeucausapxepComponent;
  let fixture: ComponentFixture<YeucausapxepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YeucausapxepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YeucausapxepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
