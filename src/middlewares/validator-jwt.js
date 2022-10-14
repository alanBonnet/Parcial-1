//Importado del modelo de Usuario
const UserModel = require('../models/USER');
//Importado del JWT para verificarlos
const jwt = require('jsonwebtoken');

//Fn para validarJWT
const validarJWT = async (req, res, next) => {
    let token = req.headers.authorization;

    /* verify if token in a request exist */
    if(!token){
        return res.status(401).json({
            msg: 'Error de autenticación - no hay token en la petición'
        })
    };//Devuelve en caso de no recibir el token

    try {
        /* Is obtained idUser, if was validated */
        const {userID} = await jwt.verify(token, process.env.SECRET);
        /* find User on DB to know if to belongs at system */
        const Usuario = await UserModel.findById(userID);
        /* If don't exist User throw an error */
        if(!Usuario) {
            return res.status(401).json({
                error: 'Token no válido - usuario no existe en la DB'
            })
        };//Devuelve en caso de que el usuario no existe en la DB
        /* Verify if the User is Active */
        if (!Usuario.isActive) {
            return res.status(401).json({
                message: 'Token no válido - usuario no está activo'
            })
        };//Devuelve en caso de que el usuario con estado false
        /* is added the info by user to request what for can be utilized on rest of middlewares*/
        req.user = Usuario;

        /* to be continue of rest the request */
        next();//En caso exitoso sigue con la ejecución
    } catch (error) {
        console.log(error.message);
        res.status(401).json(
            {
                msg: ' Error de autenticación - Token no válido'
            }
        )//Token no válido
    }
}

module.exports = validarJWT