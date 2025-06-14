import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherComponent } from './weather.component';

// Describe el grupo de tests para el componente WeatherComponent
describe('WeatherComponent', () => {
  let component: WeatherComponent; // Variable para la instancia del componente
  let fixture: ComponentFixture<WeatherComponent>; // Variable para el fixture de pruebas

  // beforeEach se ejecuta antes de cada test
  beforeEach(async () => {
    // Configura el módulo de pruebas e importa el componente
    await TestBed.configureTestingModule({
      imports: [WeatherComponent]
    })
    .compileComponents();
    
    // Crea la instancia del componente y detecta cambios
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test: el componente debe crearse correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});