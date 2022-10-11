//TODO:Importado el modelo de usuario
const User = require('../models/USER');
//TODO:Importado dependencias
const generarJWT = require('../helpers/generator-jwt');
const bcrypt = require('bcrypt');
const CtrlAuth = {};

CtrlAuth.login = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const USER = await User.findOne({username});
        if (!USER) {
            return res.status(400).json({
                    ok:false,
                    message:"Error al autenticase - Usuario no encontrado"
            });
        };//TODO:En caso de que no encuentre el usuario
        if(!USER.isActive) {
            return res.status(400).json({
                    ok:false,
                    message:"Error al autenticarse - Usuario inactivo"
            });
        };//TODO:En caso de que encuentre el usuario y su estado esté en false
        // Verify the password
        const validPassword = bcrypt.compareSync(password, USER.password);
        if(!validPassword) {
            return res.status(400).json({
                ok:false,
                message:"Error al comprobar - Contraseña Incorrecta"
            });
        };//TODO:En caso de que la contraseña no coincida
        // Generate a JWT
        const token = await generarJWT(USER);
        
        return res.json({token});//TODO:Retorno exitoso del token
        
    } catch (error) {
        return res.status(500).json({message:'Error al iniciar sesión',error: error.message || error });//TODO:Error cuando no pudo iniciar la sesión porque no pudo crearse el token
    }
}

module.exports = CtrlAuth;