console.clear();
//TODO: Importamos las libreria 
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config()
//TODO: Conexión a la base de datos
const connectDB = require('./connection');
connectDB()

//TODO: Inicializamos express
const app = express();
//configuraciones
const port = process.env.PORT;

//TODO: Middlewares
app.use(cors())
app.use(morgan('combined'));
app.use(express.json());

//TODO: Rutas
app.use(require('./routes/user.routes'))// rutas del usuario
app.use(require('./routes/auth.routes'))// rutas de login 
app.use(require('./routes/task.routes'))// rutas del tareas

//TODO: Inicio de servidor
app.listen(port, console.log(`Servidor inicializado en http://localhost:${port}`));