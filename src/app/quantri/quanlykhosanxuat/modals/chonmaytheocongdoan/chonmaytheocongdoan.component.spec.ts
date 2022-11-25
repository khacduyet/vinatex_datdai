import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChonmaytheocongdoanComponent } from './chonmaytheocongdoan.component';

describe('ChonmaytheocongdoanComponent', () => {
  let component: ChonmaytheocongdoanComponent;
  let fixture: ComponentFixture<ChonmaytheocongdoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonmaytheocongdoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChonmaytheocongdoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
