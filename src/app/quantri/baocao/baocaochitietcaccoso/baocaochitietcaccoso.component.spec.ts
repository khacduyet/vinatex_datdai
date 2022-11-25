import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaocaochitietcaccosoComponent } from './baocaochitietcaccoso.component';

describe('BaocaochitietcaccosoComponent', () => {
  let component: BaocaochitietcaccosoComponent;
  let fixture: ComponentFixture<BaocaochitietcaccosoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaocaochitietcaccosoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaocaochitietcaccosoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
