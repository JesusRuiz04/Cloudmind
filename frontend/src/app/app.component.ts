import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from './services/user.service'; // <-- Importa el servicio

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  email = '';

  constructor(private router: Router, private userService: UserService) {
    // Suscríbete para actualizar el email automáticamente
    this.userService.email$.subscribe(email => this.email = email);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  logout() {
    this.userService.clearEmail(); // Usa el servicio para limpiar el email
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('city');
    this.router.navigate(['/login']);
  }
}