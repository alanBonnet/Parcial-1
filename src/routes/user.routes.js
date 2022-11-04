//Importado de las dependencias Router, Middlewares: isAdmin y validateJWT
const router = require('express').Router();
const isAdmin = require('../middlewares/is-admin');
const USER = require('../models/USER')
const validateJWT = require('../middlewares/validator-jwt');
const {isAuthorized,isEmail, validarCampos, existUser, existEmail} = require('../middlewares/validaciones')
const {check} = require('express-validator')
//Importado Desestructurado del controlador de User
const {
    getUsers,
    getUserID,
    postUser,
    putUser,
    deleteUser
} = require('../controllers/user.controllers');

//Ruta GetUsers
router.get('/users',[validateJWT,isAdmin],getUsers);//Para obtener todos los usuarios

//Ruta GetUserID
router.get('/user',[validateJWT],getUserID);//Para obtener un usuario por ID

//Ruta PostUser
router.post('/user',[
                    check('username')
                    .custom(existUser)
                    .isLength({min:8}).withMessage('Extensión incorrecta')
                    .not()
                    .isEmpty().withMessage('Vuelva a intentarlo.')
                    .isString().withMessage('Intente nuevamente.'),

                    check('password')
                    .isLength({min:8}).withMessage('Extensión incorrecta')
                    .not()
                    .isEmpty().withMessage('Vuelva a intentarlo.')
                    .isString().withMessage('Intente nuevamente.'),

                    check('email')
                    .isEmail().withMessage('Email inválido, intente nuevamente.')
                    .custom(existEmail)
                    .not()
                    .isEmpty().withMessage('Vuelva a intentarlo.')
                    .isString().withMessage('Intente nuevamente.'),


                    validarCampos
],postUser);//Creo un usuario

//Ruta PutUser
router.put('/user/:idUser',[validateJWT, isAuthorized,isEmail],putUser);//Modifico un usuario

//Ruta DeleteUser 
router.delete('/user/:idUser',[validateJWT, isAuthorized],deleteUser);//Elimino un usuario y también sus tareas


module.exports = router;