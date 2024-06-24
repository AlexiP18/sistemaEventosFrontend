import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupCompanyComponent } from './signup-company.component';
import { AuthService } from '../../services/auth/auth.service';
import {
  NzNotificationModule,
  NzNotificationService,
} from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {
  NzFormControlComponent,
  NzFormItemComponent,
} from 'ng-zorro-antd/form';
import { of, throwError } from 'rxjs';

fdescribe('SignupCompanyComponent', () => {
  let component: SignupCompanyComponent;
  let fixture: ComponentFixture<SignupCompanyComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let notificationSpy: jasmine.SpyObj<NzNotificationService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj('AuthService', [
      'registerCompany',
    ]);
    const notificationMock = jasmine.createSpyObj('NzNotificationService', [
      'success',
      'error',
    ]);
    const routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [
        SignupCompanyComponent,
        NzFormItemComponent,
        NzFormControlComponent,
      ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        NzNotificationModule,
        NzButtonModule,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: NzNotificationService, useValue: notificationMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupCompanyComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    notificationSpy = TestBed.inject(
      NzNotificationService
    ) as jasmine.SpyObj<NzNotificationService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should submit form successfully', () => {
    // Simula el comportamiento de la respuesta exitosa del servicio
    authServiceSpy.registerCompany.and.returnValue(of({}));

    component.validateForm.setValue({
      email: 'test@test.com',
      name: 'Test Name',
      address: 'Test Address',
      phone: '1234567890',
      password: 'password123',
      checkPassword: 'password123',
    });

    component.submitForm();

    expect(authServiceSpy.registerCompany).toHaveBeenCalledWith({
      email: 'test@test.com',
      name: 'Test Name',
      address: 'Test Address',
      phone: '1234567890',
      password: 'password123',
      checkPassword: 'password123',
    });

    expect(notificationSpy.success).toHaveBeenCalledWith(
      'SUCCESS',
      'Registro Exitoso',
      { nzDuration: 5000 }
    );

    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/login');
  });
  //simula el envio de datos
  it('should show error on form submission failure', () => {
    // Simula el comportamiento de la respuesta fallida del servicio
    authServiceSpy.registerCompany.and.returnValue(
      throwError({ error: 'Registro fallido' })
    );

    component.validateForm.setValue({
      email: 'test@test.com',
      name: 'Test Name',
      address: 'Test Address',
      phone: '1234567890',
      password: 'password123',
      checkPassword: 'password123',
    });

    component.submitForm();

    expect(notificationSpy.error).toHaveBeenCalledWith(
      'ERROR',
      'Registro fallido',
      { nzDuration: 5000 }
    );
  });
  //marca algun campo como no valido cuando faltan por llenar
  it('should mark form as invalid when fields are missing', () => {
    component.validateForm.setValue({
      email: '',
      name: '',
      address: '',
      phone: '',
      password: '',
      checkPassword: '',
    });

    expect(component.validateForm.valid).toBeFalsy();
  });
});
