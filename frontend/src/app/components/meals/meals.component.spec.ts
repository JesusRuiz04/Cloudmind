import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MealsComponent } from './meals.component';

// Describe el grupo de tests para el componente MealsComponent
describe('MealsComponent', () => {
  let component: MealsComponent; // Variable para la instancia del componente
  let fixture: ComponentFixture<MealsComponent>; // Variable para el fixture de pruebas

  // beforeEach se ejecuta antes de cada test
  beforeEach(async () => {
    // Configura el módulo de pruebas e importa el componente
    await TestBed.configureTestingModule({
      imports: [MealsComponent]
    })
    .compileComponents();
    
    // Crea la instancia del componente y detecta cambios
    fixture = TestBed.createComponent(MealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test: el componente debe crearse correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});