import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChonkienbonghoimodalComponent } from './chonkienbonghoimodal.component';

describe('ChonkienbonghoimodalComponent', () => {
  let component: ChonkienbonghoimodalComponent;
  let fixture: ComponentFixture<ChonkienbonghoimodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonkienbonghoimodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChonkienbonghoimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
