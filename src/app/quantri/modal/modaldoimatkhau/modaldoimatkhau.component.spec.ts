import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldoimatkhauComponent } from './modaldoimatkhau.component';

describe('ModaldoimatkhauComponent', () => {
  let component: ModaldoimatkhauComponent;
  let fixture: ComponentFixture<ModaldoimatkhauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldoimatkhauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldoimatkhauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
