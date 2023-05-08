import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLogupComponent } from './login-logup.component';

describe('LoginLogupComponent', () => {
  let component: LoginLogupComponent;
  let fixture: ComponentFixture<LoginLogupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginLogupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginLogupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
