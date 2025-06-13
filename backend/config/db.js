// Importa el paquete mongoose para manejar la conexión con MongoDB
const mongoose = require('mongoose');

// Función asíncrona para conectar a la base de datos
const connectDB = async () => {
  try {
    // Intenta conectar a MongoDB usando la URI almacenada en las variables de entorno
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // Si la conexión es exitosa, muestra el host conectado en consola
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Si ocurre un error, muestra el mensaje y termina el proceso con error
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Exporta la función para poder usarla en otros archivos (por ejemplo, en server.js)
module.exports = connectDB;