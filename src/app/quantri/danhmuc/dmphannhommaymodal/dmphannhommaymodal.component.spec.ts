import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmphannhommaymodalComponent } from './dmphannhommaymodal.component';

describe('DmphannhommaymodalComponent', () => {
  let component: DmphannhommaymodalComponent;
  let fixture: ComponentFixture<DmphannhommaymodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmphannhommaymodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmphannhommaymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
