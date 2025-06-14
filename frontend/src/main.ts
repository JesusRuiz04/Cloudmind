import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; 
import { routes } from './app/app.routes';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

// Registra los datos de localización para español (es) en Angular
registerLocaleData(localeEs, 'es');

// Inicializa la aplicación Angular con los proveedores necesarios
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),    // Proveedor de rutas principales
    provideHttpClient(),      // Proveedor para peticiones HTTP
  ],
}).catch((err) => console.error(err)); // Captura y muestra errores de arranque