import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDrugTableComponent } from './main-drug-table.component';

describe('MainDrugTableComponent', () => {
  let component: MainDrugTableComponent;
  let fixture: ComponentFixture<MainDrugTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainDrugTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDrugTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
