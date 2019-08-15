import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionalDrugQuentityComponent } from './divisional-drug-quentity.component';

describe('DivisionalDrugQuentityComponent', () => {
  let component: DivisionalDrugQuentityComponent;
  let fixture: ComponentFixture<DivisionalDrugQuentityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivisionalDrugQuentityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionalDrugQuentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
