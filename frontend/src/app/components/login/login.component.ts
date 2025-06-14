import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

login() {
  this.authService.login(this.credentials).subscribe(
    (res: any) => {
      localStorage.setItem('token', res.token); // <-- Añade esto
      localStorage.setItem('city', res.city);
      localStorage.setItem('userId', res.userId);
      localStorage.setItem('email', this.credentials.email);
      this.router.navigate(['/weather', res.city || 'Madrid']);
      
    },
    (err) => {
      console.error('Error al iniciar sesión:', err);
      alert('Error al iniciar sesión. Verifica tus credenciales.');
    }
  );
}
}