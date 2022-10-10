const mongoose = require('mongoose');

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

module.exports = connectdb;