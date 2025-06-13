// Importa mongoose para definir el esquema y el modelo
const mongoose = require('mongoose');

// Define el esquema de Meal (comidas)
const mealSchema = new mongoose.Schema({
  // Referencia al usuario dueño de estas comidas
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // Ciudad asociada a las comidas (puede usarse para personalizar la experiencia)
  city: { type: String, required: true },
  // Array de objetos con comida y cena para cada día
  meals: [
    {
      lunch: String,   // Comida del mediodía
      dinner: String   // Cena
    }
  ],
  // Lista de ingredientes para la semana
  ingredients: String
});

// Exporta el modelo Meal para usarlo en controladores y rutas
module.exports = mongoose.model('Meal', mealSchema);