import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDrugAddComponent } from './main-drug-add.component';

describe('MainDrugAddComponent', () => {
  let component: MainDrugAddComponent;
  let fixture: ComponentFixture<MainDrugAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainDrugAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDrugAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
