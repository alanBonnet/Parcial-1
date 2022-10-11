const {login} = require('../controllers/auth.controllers');

const router = require('express').Router();

router.get('/login', (req, res) => {
    return res.json({
        message:"Ingrese su usuario y contraseña"
    })
})

router.post('/login',login);

module.exports = router;