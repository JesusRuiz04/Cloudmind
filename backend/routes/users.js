const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Ruta para actualizar la preferencia de envío de correos de un usuario (POST /api/users/email-preference)
router.post('/email-preference', async (req, res) => {
  const { userId, emailEnabled } = req.body; // Extrae userId y la preferencia del cuerpo de la petición
  try {
    // Actualiza el campo emailEnabled del usuario en la base de datos
    await User.findByIdAndUpdate(userId, { emailEnabled });
    res.json({ message: 'Preferencia actualizada' }); // Responde con mensaje de éxito
  } catch (error) {
    // Si ocurre un error, responde con el mensaje de error
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener los datos de un usuario por su ID (GET /api/users/:userId)
router.get('/:userId', async (req, res) => {
  try {
    // Busca el usuario por su ID
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' }); // Si no existe, responde con error
    res.json(user); // Si existe, responde con el usuario
  } catch (error) {
    // Si ocurre un error, responde con el mensaje de error
    res.status(500).json({ error: error.message });
  }
});

// Exporta el router para usarlo en server.js
module.exports = router;