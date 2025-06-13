// Importa mongoose para definir el esquema y el modelo de usuario
const mongoose = require('mongoose');
// Importa bcrypt para cifrar las contraseñas antes de guardarlas
const bcrypt = require('bcrypt');

// Define el esquema de usuario
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Email único y obligatorio
  password: { type: String, required: true },            // Contraseña obligatoria
  city: { type: String, required: true },                // Ciudad obligatoria
  emailEnabled: { type: Boolean, default: false }        // Preferencia para recibir correos, por defecto desactivado
});

// Middleware: antes de guardar un usuario, cifra la contraseña si ha sido modificada
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Si la contraseña no ha cambiado, sigue
  const salt = await bcrypt.genSalt(10);           // Genera un "salt" para el hash
  this.password = await bcrypt.hash(this.password, salt); // Cifra la contraseña
  next();
});

// Exporta el modelo User para usarlo en controladores y rutas
module.exports = mongoose.model('User', userSchema);