const TaskModel = require('../models/TASK');
const validations = {}

validations.isAuthorized = (req, res, next) => {
    if(!(req.params.idUser == req.user._id || req.user.role === 'user_admin')){
        return res.status(401).json({
            message: "No está autorizado para esta petición"
        })
    }//Verifico si está autorizado el usuario por role o si es propietario de la tarea
    next()
}
validations.isEmail = (req, res, next) => {
    const {email}=req.body;
    const myRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if(!(myRegex.test(email))){
        return res.status(400).json({
            message: "Email inválido"
        });
    }
    next();
} 
validations.isAuthorized_Task = async (req, res, next) => {
    const idTask = req.params.idTask;
    const userID = req.user._id;
    if(!idTask){
        return res.status(400).json({
            message:"No viene la ID de la tarea"
        })
    }
    const Task = await TaskModel.findById(idTask);
    if(!Task || !Task.isActive){
        return res.status(404).json({
            message: 'No se encuentra la tarea',
        })
    }
    const userIdString = userID.toString();
    const tareaIdString = Task.idUser.toString();
    if(!((userIdString === tareaIdString)|| req.user.role === 'user_admin')){
        return res.status(401).json({
            message: 'No está autorizado para esta petición'
        })
    }
    req.task = Task;
    next();
}
module.exports = validations;