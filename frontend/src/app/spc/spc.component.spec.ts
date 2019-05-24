import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfile1Component } from './spc.component';

describe('UserProfileComponent', () => {
  let component: UserProfile1Component;
  let fixture: ComponentFixture<UserProfile1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfile1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfile1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
