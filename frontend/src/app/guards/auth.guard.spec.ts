import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authGuard } from './auth.guard';

// Grupo de tests para el guardia de autenticación
describe('authGuard', () => {
  // Función auxiliar para ejecutar el guardia en el contexto de pruebas
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  // Configura el entorno de pruebas antes de cada test
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  // Test: el guardia debe crearse correctamente
  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});