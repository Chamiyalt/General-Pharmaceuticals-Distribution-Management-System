import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalDistComponent } from './hospital-dist.component';

describe('HospitalDistComponent', () => {
  let component: HospitalDistComponent;
  let fixture: ComponentFixture<HospitalDistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalDistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalDistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
