import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  // Objeto para almacenar los datos del usuario a registrar
  user = { email: '', password: '', city: '' };

  // Inyecta el servicio de autenticación y el router para navegación
  constructor(private authService: AuthService, private router: Router) {}

  // Método que se llama al enviar el formulario de registro
  register() {
  console.log('Datos enviados:', this.user); 
  this.authService.register(this.user).subscribe(
    (res) => {
      console.log('Registro exitoso:', res);
      alert('Registro exitoso. Mostrando previsión del tiempo.');
      localStorage.setItem('email', this.user.email); // <-- Añade esta línea
      this.router.navigate(['/weather', this.user.city]);
    },
      (err) => {
        // Si hay error, muestra mensajes según el tipo de error
        console.error('Error al registrarse:', err);
        if (err.status === 400) {
          alert('Solicitud inválida. Verifica los datos ingresados.');
        } else {
          alert('Hubo un error al registrarse. Por favor, intenta nuevamente.');
        }
      }
    );
  }
}