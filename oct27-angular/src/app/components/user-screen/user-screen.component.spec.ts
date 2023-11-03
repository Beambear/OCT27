import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserScreenComponent } from './user-screen.component';

describe('UserScreenComponent', () => {
  let component: UserScreenComponent;
  let fixture: ComponentFixture<UserScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserScreenComponent]
    });
    fixture = TestBed.createComponent(UserScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
