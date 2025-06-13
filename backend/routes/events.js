// Importa express y crea un router
const express = require('express');
const router = express.Router();

// Ruta GET principal para /api/events que responde con un mensaje de prueba
router.get('/', (req, res) => {
  res.send('Events route is working!');
});

// Exporta el router para usarlo en server.js u otros archivos
module.exports = router;