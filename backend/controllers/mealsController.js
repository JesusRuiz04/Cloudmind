const mongoose = require('mongoose');
const Meal = require('../models/Meal');

// Controlador para guardar o actualizar las comidas y la lista de ingredientes de un usuario
exports.saveMeals = async (req, res) => {
  const { meals, ingredients, city, userId } = req.body; // Extrae los datos enviados desde el frontend
  console.log('Datos recibidos en saveMeals:', { userId, meals, ingredients, city }); // Log para depuración
  try {
    // Convierte el userId recibido a un ObjectId de MongoDB
    const objectUserId = new mongoose.Types.ObjectId(userId);
    // Busca si ya existe un registro de comidas para ese usuario
    let meal = await Meal.findOne({ user: objectUserId });
    if (meal) {
      // Si existe, actualiza los datos
      meal.meals = meals;
      meal.ingredients = ingredients;
      meal.city = city;
      await meal.save();
      console.log('Comidas actualizadas para userId:', userId);
    } else {
      // Si no existe, crea un nuevo registro
      meal = await Meal.create({ user: objectUserId, meals, ingredients, city });
      console.log('Comidas creadas para userId:', userId);
    }
    // Devuelve mensaje de éxito al frontend
    res.json({ message: 'Comidas guardadas con éxito' });
  } catch (error) {
    // Si ocurre un error, lo muestra en consola y responde con error al frontend
    console.error('Error en saveMeals:', error);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
};

// Controlador para obtener las comidas y la lista de ingredientes de un usuario
exports.getMeals = async (req, res) => {
  const { userId } = req.query; // Extrae el userId de la query string
  console.log('Buscando comidas para userId:', userId); // Log para depuración
  try {
    // Convierte el userId recibido a un ObjectId de MongoDB
    const objectUserId = new mongoose.Types.ObjectId(userId);
    // Busca el registro de comidas para ese usuario
    const meal = await Meal.findOne({ user: objectUserId });
    // Devuelve el registro encontrado o un objeto vacío si no existe
    res.json(meal || {});
  } catch (error) {
    // Si ocurre un error, lo muestra en consola y responde con error al frontend
    console.error('Error en getMeals:', error);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
};