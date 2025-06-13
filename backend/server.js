// Importa los módulos necesarios
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const mealsRoutes = require('./routes/meals');
const sendDailyEmails = require('./emailScheduler');
const cron = require('node-cron');

// Programa una tarea diaria a las 7:00 AM para enviar correos automáticos
cron.schedule('0 7 * * *', () => {
  sendDailyEmails().catch(console.error);
});

// Carga las variables de entorno desde el archivo .env
dotenv.config();

// Conecta a la base de datos MongoDB
connectDB();

const app = express();

// Middleware para permitir CORS (peticiones entre dominios)
app.use(cors());
// Middleware para parsear JSON en las peticiones
app.use(express.json());
// Middleware para rutas de comidas
app.use('/api/meals', mealsRoutes);

// Rutas principales de la API
app.use('/api/auth', require('./routes/auth'));     // Autenticación (login/registro)
app.use('/api/events', require('./routes/events')); // Ruta de ejemplo/test
app.use('/api/users', require('./routes/users'));   // Gestión de usuarios

// Inicia el servidor en el puerto especificado (por defecto 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`CloudMind backend running on port ${PORT}`));