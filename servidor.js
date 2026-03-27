require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');
const authenticateToken = require('./middleware/autentication_middleware');

const app = express();
app.use(express.json());
app.use(cors());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const PORT = procces.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.post('/registrar', async (req, res) => {
  try{
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'El usuario y la contraseña son requeridos' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { data, error } = await supabase
    .from('Usuarios')
    .insert([
      { Username: username, Password: hashedPassword }
    ]);

    if (error) {
      console.error('Error al insertar en Supabase:', error);
      return res.status(500).json({ message: 'Error al registrar el usuario' });
    }

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  }catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const {data: user, error} = await supabase
    .from('Usuarios')
    .select('Password')
    .eq('Username', username)
    .single();

    if (error || !user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.Password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login exitoso', token });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  } 
});     


app.get('/protegido', authenticateToken, (req, res) => { 
    res.status(200).json({
       message: `Hola, bienvenido ${req.user.username}!`, 
       data: 'esta información solo es accesible con un token válido'     
      });
});
