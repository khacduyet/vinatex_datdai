import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmphannhommayChonmathangmodalComponent } from './dmphannhommay-chonmathangmodal.component';

describe('DmphannhommayChonmathangmodalComponent', () => {
  let component: DmphannhommayChonmathangmodalComponent;
  let fixture: ComponentFixture<DmphannhommayChonmathangmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmphannhommayChonmathangmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmphannhommayChonmathangmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
