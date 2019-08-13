import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalDrugQuentityComponent } from './hospital-drug-quentity.component';

describe('HospitalDrugQuentityComponent', () => {
  let component: HospitalDrugQuentityComponent;
  let fixture: ComponentFixture<HospitalDrugQuentityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalDrugQuentityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalDrugQuentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
