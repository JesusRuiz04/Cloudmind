import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Hace que el servicio esté disponible en toda la aplicación
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth'; // URL base de la API de autenticación

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión: envía las credenciales al backend y devuelve la respuesta como observable
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Método para registrar un usuario: envía los datos al backend y devuelve la respuesta como observable
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
}