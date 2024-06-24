import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupClientComponent } from './signup-client.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {
  NzFormControlComponent,
  NzFormItemComponent,
} from 'ng-zorro-antd/form';

fdescribe('SignupClientComponent', () => {
  let component: SignupClientComponent;
  let fixture: ComponentFixture<SignupClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SignupClientComponent,
        NzFormItemComponent,
        NzFormControlComponent,
      ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        NzNotificationModule,
        NzButtonModule, // Importa NzButtonModule aquí
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create SignupClientComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with correct fields and validators', () => {
    expect(component.validateForm).toBeDefined();
    expect(component.validateForm.get('email')).toBeTruthy();
    expect(component.validateForm.get('password')).toBeTruthy();
    expect(component.validateForm.get('checkPassword')).toBeTruthy();
    expect(component.validateForm.get('name')).toBeTruthy();
    expect(component.validateForm.get('lastname')).toBeTruthy();
    expect(component.validateForm.get('phone')).toBeTruthy();

    // Test Validators
    const emailControl = component.validateForm.get('email');
    emailControl.setValue('invalidemail'); // Set invalid email format
    expect(emailControl.valid).toBeFalsy();
    emailControl.setValue('valid@email.com'); // Set valid email format
    expect(emailControl.valid).toBeTruthy();
  });
});
