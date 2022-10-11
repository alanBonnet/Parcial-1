const router = require('express').Router();
const isAdmin = require('../middlewares/is-admin');
const validateJWT = require('../middlewares/validator-jwt');
const {
    getUsers,
    getUserID,
    postUser,
    putUser,
    deleteUser,
} = require('../controllers/user.controllers');

router.get('/user',[validateJWT,isAdmin],getUsers);//Para obtener todos los usuarios

router.get('/user/:idUser',[validateJWT],getUserID);//Para obtener un usuario por ID

router.post('/user',postUser);//Creo un usuario

router.put('/user/:idUser',[validateJWT],putUser);//Modifico un usuario

router.delete('/user/:idUser',[validateJWT],deleteUser);//Elimino un usuario

module.exports = router;