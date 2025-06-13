// Importa los módulos necesarios
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const User = require('./models/User');
const Meal = require('./models/Meal');
const axios = require('axios');
const dotenv = require('dotenv');

// Carga variables de entorno desde el archivo .env
dotenv.config();

// Conexión a MongoDB usando la URI de las variables de entorno
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB conectado');
}).catch(err => {
  console.error('Error conectando a MongoDB:', err);
});

// Configura el transporte de nodemailer para enviar correos desde Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'cloudmind.oficial@gmail.com',
    pass: 'yhse nuki vlno bksg' // Contraseña de aplicación de Gmail
  }
});

// Función para obtener la previsión del tiempo de una ciudad usando la API de RapidAPI
async function getWeather(city) {
  const url = `https://weather-api167.p.rapidapi.com/api/weather/forecast?place=${encodeURIComponent(city)},ES&cnt=1&units=metric&type=three_hour&mode=json&lang=es`;
  const options = {
    headers: {
      'x-rapidapi-key': 'bdc72774c9mshaa4eb3d846ea3f9p1e4038jsna604f3bc9692', // Tu API Key de RapidAPI
      'x-rapidapi-host': 'weather-api167.p.rapidapi.com',
      'Accept': 'application/json'
    }
  };
  const response = await axios.get(url, options);
  return response.data;
}

// Función principal para enviar correos diarios a los usuarios que lo tengan activado
async function sendDailyEmails() {
  // Busca todos los usuarios que tienen activado el envío de correos
  const users = await User.find({ emailEnabled: true });
  for (const user of users) {
    // Busca la lista de la compra y comidas del usuario
    const meal = await Meal.findOne({ user: user._id });
    // Obtiene la previsión del tiempo para la ciudad del usuario
    const weatherData = await getWeather(user.city);

    // Extrae la información relevante del primer bloque horario
    let weatherText = 'No disponible';
    if (
      weatherData &&
      weatherData.forecast &&
      weatherData.forecast.length > 0 &&
      weatherData.forecast[0].weather &&
      weatherData.forecast[0].weather.description
    ) {
      weatherText = `${weatherData.forecast[0].weather.description}, ${weatherData.forecast[0].main.temp}°C`;
    }

    // Configura el contenido del correo electrónico
    const mailOptions = {
      from: 'cloudmind.oficial@gmail.com',
      to: user.email,
      subject: `Tu previsión y lista de la compra para hoy`,
      text: `
Hola ${user.email}!

Previsión del tiempo para hoy en ${user.city}:
${weatherText}

Lista de la compra:
${meal ? meal.ingredients : 'No hay ingredientes guardados.'}

¡Buen día!
      `
    };
    // Envía el correo
    await transporter.sendMail(mailOptions);
  }
}

// Exporta la función para poder usarla en otros archivos
module.exports = sendDailyEmails;

// Permite ejecutar el script manualmente desde la terminal
if (require.main === module) {
  // Espera a que Mongoose conecte antes de enviar correos
  mongoose.connection.once('open', () => {
    sendDailyEmails()
      .then(() => {
        console.log('Correo(s) enviado(s) correctamente');
        process.exit(0);
      })
      .catch(err => {
        console.error('Error enviando correos:', err);
        process.exit(1);
      });
  });
}