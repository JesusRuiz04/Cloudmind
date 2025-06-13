// Importa express y crea un router
const express = require('express');
const router = express.Router();
// Importa el controlador de comidas
const mealsController = require('../controllers/mealsController');

// Ruta para guardar o actualizar comidas e ingredientes (POST /api/meals)
router.post('/', mealsController.saveMeals);

// Ruta para obtener comidas e ingredientes de un usuario (GET /api/meals?userId=...)
router.get('/', mealsController.getMeals);

// Exporta el router para usarlo en server.js
module.exports = router;