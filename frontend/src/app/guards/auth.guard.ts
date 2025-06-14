import { CanActivateFn, Router } from '@angular/router';

// Define una función guardia para proteger rutas que requieren autenticación
export const authGuard: CanActivateFn = (route, state) => {
  // Comprueba si existe un token en localStorage (usuario autenticado)
  const loggedIn = !!localStorage.getItem('token');
  if (!loggedIn) {
    // Si no está autenticado, redirige a la página de login
    window.location.href = '/login'; 
    return false; // Bloquea el acceso a la ruta protegida
  }
  return true; // Permite el acceso si está autenticado
};