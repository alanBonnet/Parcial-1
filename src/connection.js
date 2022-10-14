//Importado de mongoose
const mongoose = require('mongoose');

//Fn Async para conectar a la base de datos
const CONNECTDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.log(`No se pudo conectar al base de datos: ${error.message}`)
    }
}

module.exports = CONNECTDB;