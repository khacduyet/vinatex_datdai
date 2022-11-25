import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChonkienbongmodalComponent } from './chonkienbongmodal.component';

describe('ChonkienbongmodalComponent', () => {
  let component: ChonkienbongmodalComponent;
  let fixture: ComponentFixture<ChonkienbongmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonkienbongmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChonkienbongmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
