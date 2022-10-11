const router = require('express').Router();
const isAdmin = require('../middlewares/is-admin');
const validateJWT = require('../middlewares/validator-jwt');
const {
    getTasks,
    getTask_idUser,
    postTask,
    putTask,
    deleteTask
} = require('../controllers/task.controllers');

router.get('/task',getTasks);

router.get('/user/task/:idUser',getTask_idUser);

router.post('/task',[validateJWT],postTask);

router.put('/task/:idTask',[validateJWT],putTask);

router.delete('/task/:idTask',[validateJWT],deleteTask);

module.exports = router;