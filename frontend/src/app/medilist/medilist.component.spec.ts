import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedilistComponent } from './medilist.component';

describe('MedilistComponent', () => {
  let component: MedilistComponent;
  let fixture: ComponentFixture<MedilistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedilistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedilistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
