//TODO:Importado de dependencia Router y el Middleware "ValidateJWT"
const router = require('express').Router();
const validateJWT = require('../middlewares/validator-jwt');
//TODO:Importación desestructurada del controlador de tareas
const {
    getTasks,
    getTask_idUser,
    postTask,
    putTask,
    deleteTask
} = require('../controllers/task.controllers');

//TODO:Ruta getTasks
router.get('/task',getTasks);

//TODO:Ruta getTask por IdUser
router.get('/task/user/',[validateJWT],getTask_idUser);

//TODO:Ruta postTask
router.post('/task',[validateJWT],postTask);

//TODO:Ruta putTask
router.put('/task/:idTask',[validateJWT],putTask);

//TODO:Ruta deleteTask
router.delete('/task/:idTask',[validateJWT],deleteTask);

module.exports = router;