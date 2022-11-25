import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmthongkedienmodalComponent } from './dmthongkedienmodal.component';

describe('DmthongkedienmodalComponent', () => {
  let component: DmthongkedienmodalComponent;
  let fixture: ComponentFixture<DmthongkedienmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmthongkedienmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmthongkedienmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
