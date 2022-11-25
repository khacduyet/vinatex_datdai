import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiendongComponent } from './biendong.component';

describe('BiendongComponent', () => {
  let component: BiendongComponent;
  let fixture: ComponentFixture<BiendongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiendongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiendongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
