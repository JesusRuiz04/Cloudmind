import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;

  beforeEach(async () => {
    // Crea un mock para AuthService con un método login simulado que devuelve un observable
    authServiceMock = {
      login: jasmine.createSpy('login').and.returnValue(of({ token: 'fake-token' })),
    };

    // Configura el módulo de pruebas con el componente y el mock del servicio
    await TestBed.configureTestingModule({
      imports: [LoginComponent, HttpClientTestingModule], 
      providers: [{ provide: AuthService, useValue: authServiceMock }], // Usa el mock
    }).compileComponents();

    // Crea la instancia del componente y detecta cambios
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test: el componente debe crearse correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test: al llamar a login(), debe llamarse AuthService.login con las credenciales
  it('should call AuthService.login on login()', () => {
    component.credentials = { email: 'test@example.com', password: 'password' };
    component.login();
    expect(authServiceMock.login).toHaveBeenCalledWith(component.credentials);
  });
});