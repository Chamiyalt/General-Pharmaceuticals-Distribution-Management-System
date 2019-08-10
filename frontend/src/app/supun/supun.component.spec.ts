import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupunComponent } from './supun.component';

describe('SupunComponent', () => {
  let component: SupunComponent;
  let fixture: ComponentFixture<SupunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
