import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugDealerlistComponent } from './drug-dealerlist.component';

describe('DrugDealerlistComponent', () => {
  let component: DrugDealerlistComponent;
  let fixture: ComponentFixture<DrugDealerlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugDealerlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugDealerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
