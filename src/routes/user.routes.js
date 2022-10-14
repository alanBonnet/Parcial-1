//TODO:Importado de las dependencias Router, Middlewares: isAdmin y validateJWT
const router = require('express').Router();
const isAdmin = require('../middlewares/is-admin');
const validateJWT = require('../middlewares/validator-jwt');
const {isAuthorized,isEmail} = require('../middlewares/validaciones')
//TODO:Importado Desestructurado del controlador de User
const {
    getUsers,
    getUserID,
    postUser,
    putUser,
    deleteUser,
    deleteUserAllTasks
} = require('../controllers/user.controllers');

//TODO:Ruta GetUsers
router.get('/user',[validateJWT,isAdmin],getUsers);//Para obtener todos los usuarios

//TODO:Ruta GetUserID
router.get('/user/:idUser',[validateJWT, isAuthorized],getUserID);//Para obtener un usuario por ID

//TODO:Ruta PostUser
router.post('/user',[isEmail],postUser);//Creo un usuario

//TODO:Ruta PutUser
router.put('/user/:idUser',[validateJWT, isAuthorized,isEmail],putUser);//Modifico un usuario

//TODO:Ruta DeleteUser
router.delete('/user/:idUser',[validateJWT, isAuthorized],deleteUser);//Elimino un usuario

//TODO:Ruta DeleteUserAllTasks
router.delete('/user/:idUser/task',[validateJWT, isAuthorized],deleteUserAllTasks);//Elimino un usuario y todas sus tareas

module.exports = router;