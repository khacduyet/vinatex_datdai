import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimbongComponent } from './timbong.component';

describe('TimbongComponent', () => {
  let component: TimbongComponent;
  let fixture: ComponentFixture<TimbongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimbongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimbongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
