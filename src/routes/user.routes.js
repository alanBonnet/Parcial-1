const router = require('express').Router();

const {
    getUsers,
    getUserID,
    postUser,
    putUser,
    deleteUser,
} = require('../controllers/user.controllers');

router.get('/user',getUsers);//Para obtener todos los usuarios

router.get('/user/:idUser',getUserID);//Para obtener un usuario por ID

router.post('/user',postUser);//Creo un usuario

router.put('/user/:idUser',putUser);//Modifico un usuario

router.delete('/user/:idUser',deleteUser);//Elimino un usuario

module.exports = router;