import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldanhmucchungComponent } from './modaldanhmucchung.component';

describe('ModaldanhmucchungComponent', () => {
  let component: ModaldanhmucchungComponent;
  let fixture: ComponentFixture<ModaldanhmucchungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldanhmucchungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldanhmucchungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
