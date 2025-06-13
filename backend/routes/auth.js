// Importa express y los controladores de autenticación
const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

// Ruta para registrar un nuevo usuario (POST /api/auth/register)
router.post('/register', registerUser);

// Ruta para iniciar sesión (POST /api/auth/login)
router.post('/login', loginUser);

// Exporta el router para usarlo en server.js
module.exports = router;