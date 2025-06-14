import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-meals',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {
  city = localStorage.getItem('city') || 'Madrid'; // Obtiene la ciudad del usuario del localStorage o usa 'Madrid' por defecto
  userId = localStorage.getItem('userId') || '';   // Obtiene el userId del localStorage
  days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']; // Días de la semana
  meals = Array(7).fill(null).map(() => ({ lunch: '', dinner: '' })); // Array para comidas y cenas de cada día
  ingredients = '';         // Lista de ingredientes
  successMessage = '';      // Mensaje de éxito o error

  constructor(private http: HttpClient) {}

  // Al iniciar el componente, carga las comidas e ingredientes del usuario desde el backend
  ngOnInit() {
    
    this.http.get<any>(`/api/meals?userId=${this.userId}`).subscribe(data => {
      if (data && data.meals) {
        this.meals = data.meals; // Asigna las comidas recibidas
        this.ingredients = data.ingredients || ''; // Asigna los ingredientes recibidos
      }
    });
  }

  // Guarda las comidas y los ingredientes en el backend
  saveMeals() {
    this.http.post('/api/meals', {
      userId: this.userId,
      city: this.city,
      meals: this.meals,
      ingredients: this.ingredients
    }).subscribe(
      () => {
        // Si la petición es exitosa, muestra mensaje de éxito temporalmente
        this.successMessage = '¡Comidas guardadas con éxito!';
        setTimeout(() => this.successMessage = '', 3000);
      },
      () => {
        // Si hay error, muestra mensaje de error temporalmente
        this.successMessage = 'Error al guardar las comidas.';
        setTimeout(() => this.successMessage = '', 3000);
      }
    );
  }

  // Guarda solo los ingredientes (realmente llama a saveMeals para guardar todo)
  saveIngredients() {
    this.saveMeals(); 
  }
}