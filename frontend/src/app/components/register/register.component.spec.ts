import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';

// Describe el grupo de tests para el componente RegisterComponent
describe('RegisterComponent', () => {
  let component: RegisterComponent; // Variable para la instancia del componente
  let fixture: ComponentFixture<RegisterComponent>; // Variable para el fixture de pruebas

  // beforeEach se ejecuta antes de cada test
  beforeEach(async () => {
    // Configura el módulo de pruebas e importa el componente
    await TestBed.configureTestingModule({
      imports: [RegisterComponent]
    })
    .compileComponents();
    
    // Crea la instancia del componente y detecta cambios
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test: el componente debe crearse correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});