//TODO:Importado de dependencias
const USER = require('../models/USER');
const bcrypt = require('bcrypt');
//TODO: Inicializado de Controllador.objtect
const CtrlUser = {}

//TODO: Controlador de GetUsers
CtrlUser.getUsers = async (req, res) => {
    try {
        const USERS = await USER.find({isActive: true});
        if(!USERS.length){return res.status(404).json({message:"No se encontró ningún usuario."})}
        
        return res.json({
            message: `Número de Usuarios encontrados ${USERS.length}`,
            users: USERS
        })
    } catch (error) {
        return res.status(500).json({message: `No se pudieron encontrar los usuarios: ${error.message}`})
    }

}
//TODO: Controlador de GetUser por ID
CtrlUser.getUserID = async (req, res) => {
    try {
        const idUser = req.params.idUser;
        const user = await USER.findOne({$and:[{"_id":idUser},{isActive:true}]});
        if(!user){
            return res.status(404).json(
                {
                    message:"No se encuentra el usuario"
                }
            )
        }
        if(!( (idUser == req.user._id) || req.user.role === 'user_admin') ){
            return res.status(401).json(
                {
                    message: `No está autorizado para esta petición.`
                }
            )
        }
        return res.json(
            {
                message: `Usuario encontrado`,
                user
            }
        )
    } catch (error) {
        return res.status(500).json({message: `Error interno del Servidor: ${error.message}`})
    }
}
//TODO: Controlador de PostUser
CtrlUser.postUser = async (req, res) => {
    try {
        const {username, password,email} = req.body;
        if(username.length < 8 && password.length < 8){
            return res.status(404).json({
                message:"La extensión mínima del nombre de usuario o contraseña es menor a 8"
            })
        }
        // Encriptando la contraseña de usuario
        const newPassword = bcrypt.hashSync(password,10);//TODO:Mecanismo de encriptado de la contraseña

        const newUser = new USER({
            username,
            password: newPassword,
            email
        });
        await newUser.save();
        return res.status(201).json({
            message: `Usuario guardado correctamente.`
        });
    } catch (error) {
        return res.status(500).json({
            message: `Hubo un error con guardar el usuario: ${error.message}`
        })
    }
}
//TODO: Controlador de PutUser
CtrlUser.putUser = async (req, res) => {
    try {
        const idUser = req.params.idUser;
        const {password,email} = req.body;
        if(!idUser || !password || !email) {
            return res.status(400).json({
                message: `No viene id o información en la petición.`,
                opcionesDeCuerpo:["password","email"]
            })
        }
        if(password.length < 8){
            return res.status(404).json({
                message: `La extensión de la contraseña debe ser mayor a 8`
            })
        }
        const User = await USER.findOne({$and:[{_id: idUser}, {isActive: true}]});
        if(!User){
            return res.status(404).json({
                message: `El usuario no fue encontrado`
            })
        }
        if(!( (idUser == req.user._id) || req.user.role === 'user_admin') ){
            return res.status(401).json(
                {
                    message: `No está autorizado para esta petición.`
                }
            )
        }
        const newPassword = bcrypt.hashSync(password,10)
        await User.updateOne({password:newPassword , email});
        return res.status(201).json({
            message: `Usuario modificado correctamente.`
        })
    } catch (error) {
        return res.status(500).json({
            message: `Hubo un error con modificar el usuario: ${error.message}`
        })
    }
}
//TODO: Controlador de DeleteUser
CtrlUser.deleteUser = async (req, res) => {
    try {
        const idUser = req.params.idUser;
        const user = await USER.findOne({$and:[{_id: idUser},{isActive: true}]});
        if(!user){
            return res.status(404).json({
                message: `El usuario ya no existe`
            })
        }
        if(!( (idUser == req.user._id) || req.user.role === 'user_admin') ){
            return res.status(401).json(
                {
                    message: `No está autorizado para esta petición.`
                }
            )
        }
        await user.updateOne({isActive: false})
        return res.status(201).json({
            message: `Usuario eliminado correctamente.`
        })
    } catch (error) {
        return res.status(500).json({message:`Error interno del servidor: ${error.message}`})
    }
}
//TODO: export del Controlador
module.exports = CtrlUser;
