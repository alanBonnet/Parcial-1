const router = require('express').Router();

const {
    getTasks,
    getTask_idUser,
    postTask,
    putTask,
    deleteTask
} = require('../controllers/task.controllers');

router.get('/task',getTasks);

router.get('/user/task/:idUser',getTask_idUser);

router.post('/task',postTask);

router.put('/task/:idTask',putTask);

router.delete('/task/:idTask',deleteTask);

module.exports = router;