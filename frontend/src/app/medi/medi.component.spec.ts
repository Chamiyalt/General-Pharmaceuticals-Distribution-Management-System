import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediComponent } from './medi.component';

describe('MediComponent', () => {
  let component: MediComponent;
  let fixture: ComponentFixture<MediComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
