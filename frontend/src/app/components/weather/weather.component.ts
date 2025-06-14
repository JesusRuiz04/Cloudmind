import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  city: string = '';           // Ciudad seleccionada
  weather: any = null;         // Objeto para almacenar la previsión del tiempo
  error: string = '';          // Mensaje de error si falla la petición
  emailEnabled: boolean = false; // Estado del switch para correos
  userId: string = '';         // ID del usuario (para preferencias de correo)

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    // Obtiene la ciudad de la URL y el userId del localStorage
    this.city = this.route.snapshot.paramMap.get('city') || '';
    this.userId = localStorage.getItem('userId') || '';

    // Si hay ciudad, pide la previsión del tiempo a la API externa
    if (this.city) {
      const url = `https://weather-api167.p.rapidapi.com/api/weather/forecast?place=${encodeURIComponent(this.city)},ES&cnt=3&units=metric&type=three_hour&mode=json&lang=es`;
      const headers = new HttpHeaders({
        'x-rapidapi-key': 'bdc72774c9mshaa4eb3d846ea3f9p1e4038jsna604f3bc9692',
        'x-rapidapi-host': 'weather-api167.p.rapidapi.com',
        'Accept': 'application/json'
      });
      this.http.get(url, { headers }).subscribe({
        next: (data) => {
          this.weather = data; // Guarda la previsión recibida
          console.log(this.weather);
        },
        error: () => this.error = 'No se pudo obtener la previsión del tiempo.'
      });
    }

    // Si hay usuario, pide su preferencia de correos al backend
    if (this.userId) {
      this.http.get<any>(`https://cloudmind.onrender.com/api/users/${this.userId}`).subscribe({
        next: (user) => {
          this.emailEnabled = user.emailEnabled; // Actualiza el switch según la preferencia guardada
        }
      });
    }
  }

  // Cambia la preferencia de correos y la guarda en el backend
  toggleEmail() {
    this.http.post('https://cloudmind.onrender.com/api/users/email-preference', {
      userId: this.userId,
      emailEnabled: this.emailEnabled
    }).subscribe({
      next: () => {
        alert('Preferencia de correo actualizada');
      },
      error: () => {
        alert('No se pudo actualizar la preferencia de correo');
      }
    });
  }
}