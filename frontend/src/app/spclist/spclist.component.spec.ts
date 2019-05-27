import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpclistComponent } from './spclist.component';

describe('SpclistComponent', () => {
  let component: SpclistComponent;
  let fixture: ComponentFixture<SpclistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpclistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpclistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
