import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportdanhmucmodelComponent } from './importdanhmucmodel.component';

describe('ImportdanhmucmodelComponent', () => {
  let component: ImportdanhmucmodelComponent;
  let fixture: ComponentFixture<ImportdanhmucmodelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportdanhmucmodelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportdanhmucmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
