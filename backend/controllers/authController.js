// Importa el modelo de usuario, el paquete para JWT y bcrypt para contraseñas
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Controlador para registrar un nuevo usuario
exports.registerUser = async (req, res) => {
  const { email, password, city } = req.body; // Extrae los datos del cuerpo de la petición
  try {
    // Crea un nuevo usuario en la base de datos
    const user = await User.create({ email, password, city });
    // Devuelve un mensaje de éxito
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Si hay error (por ejemplo, email repetido), devuelve el error
    res.status(400).json({ error: error.message });
  }
};

// Controlador para login de usuario
exports.loginUser = async (req, res) => {
  const { email, password } = req.body; // Extrae email y contraseña del cuerpo
  try {
    // Busca el usuario por email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Compara la contraseña recibida con la almacenada (hash)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    // Si todo es correcto, genera un token JWT con el id del usuario
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    // Devuelve el token, la ciudad y el userId al frontend
    res.json({ token, city: user.city, userId: user._id });
  } catch (error) {
    // Si hay error interno, lo devuelve
    res.status(500).json({ error: error.message });
  }
};