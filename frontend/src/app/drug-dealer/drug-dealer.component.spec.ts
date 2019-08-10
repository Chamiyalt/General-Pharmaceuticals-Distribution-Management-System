import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugDealerComponent } from './drug-dealer.component';

describe('DrugDealerComponent', () => {
  let component: DrugDealerComponent;
  let fixture: ComponentFixture<DrugDealerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugDealerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
