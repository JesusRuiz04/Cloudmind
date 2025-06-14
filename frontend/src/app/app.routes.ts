import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { WeatherComponent } from './components/weather/weather.component';
import { MealsComponent } from './components/meals/meals.component';
import { authGuard } from './guards/auth.guard'; // Importa el guardia de autenticación

// Define las rutas principales de la aplicación
export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Ruta para login
  { path: 'register', component: RegisterComponent }, // Ruta para registro
  { path: 'weather/:city', component: WeatherComponent, canActivate: [authGuard] }, // Ruta protegida para previsión del tiempo
  { path: 'meals', component: MealsComponent, canActivate: [authGuard] },           // Ruta protegida para comidas
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Redirección por defecto a login
];