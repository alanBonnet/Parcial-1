const jwt = require('jsonwebtoken');

const UserModel = require('../models/USER');

const validarJWT = async (req, res, next) => {
    let token = req.headers.authorization;

    /* verify if token in a request exist */
    if(!token){
        return res.status(401).json({
            msg: 'Error de autenticación - no hay token en la petición'
        })
    };

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
        };
        /* Verify if the User is Active */
        if (!Usuario.isActive) {
            return res.status(401).json({
                message: 'Token no válido - usuario con estado false'
            })
        };
        /* is added the info by user to request what for can be utilized on rest of middlewares*/
        req.user = Usuario;

        /* to be continue of rest the request */
        next();
    } catch (error) {
        console.log(error.message);
        res.status(401).json(
            {
                msg: ' Error de autenticación - Token no válido'
            }
        )
    }
}

module.exports = validarJWT