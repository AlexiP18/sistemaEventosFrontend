import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs'; // Asegúrate de importar 'of' de RxJS

// Mock de NzNotificationService
class MockNzNotificationService {
  success(message: string, description?: string) {}
  error(message: string, description?: string) {}
}

// Mock de AuthService
class MockAuthService {
  login(userName: string, password: string) {
    // Simular una respuesta de login. Puedes personalizar esto según tus necesidades.
    return of({ success: true });
  }
}

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let notificationService: MockNzNotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NzFormModule,
        NzInputModule,
        NzButtonModule,
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService }, // Usar el mock de AuthService
        { provide: NzNotificationService, useClass: MockNzNotificationService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService); // Inyectar AuthService
    notificationService = TestBed.inject(
      NzNotificationService
    ) as MockNzNotificationService;

    fixture.detectChanges(); // Realizar la detección de cambios inicial
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.validateForm.value.userName).toBe(null);
    expect(component.validateForm.value.password).toBe(null);
  });

  it('should authenticate successfully with correct credentials', fakeAsync(() => {
    const usernameInput = component.validateForm.controls['userName'];
    const passwordInput = component.validateForm.controls['password'];

    // Simular valores de usuario y contraseña válidos
    usernameInput.setValue('testuser@example.com');
    passwordInput.setValue('testpassword');

    // Espiar el método de login del AuthService
    spyOn(authService, 'login').and.callThrough();

    // Llamar al método submitForm() del componente
    component.submitForm();

    tick(); // Esperar a que se resuelva la promesa

    fixture.detectChanges();

    // Verificar el comportamiento esperado después de la autenticación
    expect(authService.login).toHaveBeenCalledWith(
      'testuser@example.com',
      'testpassword'
    );
    // Puedes añadir más expectativas según el comportamiento esperado después del login exitoso
  }));
});
