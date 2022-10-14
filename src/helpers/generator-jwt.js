const jwt = require('jsonwebtoken');
// Generador del JWT
const generateJWT = (USER) => {
    return new Promise((resolve, reject) =>{
        /* Generate a token with idUser and a secret word */
        jwt.sign({userID:USER['_id'],role:USER['role']}, process.env.SECRET,{
            expiresIn: '5h'
        }, (err, token) => {
            if(err){
                reject(`No se pudo generar el token: ${err.message}`);//:Salida del error
            }
            console.log(`Se creó un token para el usuario de: ${USER['_id']} (${USER['username']}) --> "${token}"`)//:Salida del token por consola
            resolve(token)
        })
        
    })
}

module.exports = generateJWT;