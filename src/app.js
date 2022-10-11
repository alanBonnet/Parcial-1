console.clear();
// importamos las libreria 
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config()
// conexión a la base de datos
const connectDB = require('./connection');
connectDB()

//inicializamos express
const app = express();
//configuraciones
const port = process.env.PORT;

//middlewares
app.use(cors())
app.use(morgan('combined'));
app.use(express.json());

//Rutas
app.use(require('./routes/user.routes'))// rutas del usuario
app.use(require('./routes/task.routes'))// rutas del tareas

// Inicio de servidor

app.listen(port, console.log(`Servidor inicializado en http://localhost:${port}`));