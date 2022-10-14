//Importado Desestructurado de los me del Auth y dependencias
const {login} = require('../controllers/auth.controllers');

const router = require('express').Router();
//ruta Get respuesta definida
router.get('/login', (req, res) => {
    return res.json({
        message:"Ingrese su usuario y contraseña"
    })
})
//Proceso para Logear el usuario
router.post('/login',login);

module.exports = router;