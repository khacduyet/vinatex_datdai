import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmmaybienapComponent } from './dmmaybienap.component';

describe('DmmaybienapComponent', () => {
  let component: DmmaybienapComponent;
  let fixture: ComponentFixture<DmmaybienapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmmaybienapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmmaybienapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
