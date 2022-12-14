console.clear();
// Importamos las libreria 
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config()
// Conexión a la base de datos
const connectDB = require('./connection');
connectDB()

// Inicializamos express
const app = express();
//configuraciones
const port = process.env.PORT;

// Middlewares
app.use(cors())
app.use(morgan('combined'));
app.use(express.json());

// Rutas
app.use(require('./routes/user.routes'))// rutas del usuario
app.use(require('./routes/auth.routes'))// rutas de login 
app.use(require('./routes/task.routes'))// rutas del tareas

// Inicio de servidor
app.listen(port, console.log(`Servidor inicializado en http://localhost:${port}`));