//TODO:Importado del modelo de tareas y Users
const TaskModel = require('../models/TASK');
const UserModel = require('../models/USER');
const CtrlTask = {};
//TODO: Controlador que Trae Todas las tareas
CtrlTask.getTasks = async (req, res) => {
    try {
        const Tasks = await TaskModel.find({isActive: true})
        .populate('idUser',['username', 'email']);
        return res.json({
            message:`Cantidad de tareas encontradas:${Tasks.length}`,
            Tasks
        })
    } catch (error) {
        return res.status(500).json(
            {
                message:`No se pudieron encontrar las tareas.`
            }
        )
    }
};
//TODO:Obtenemos las tareas de un usuario
CtrlTask.getTask_idUser = async (req, res) => {
    try {
        const idUser = req.user._id;
        const Tasks = await TaskModel.find({$and:[{idUser},{isActive: true}]})
        .populate('idUser',['username', 'email'])
        if(!Tasks.length){
            return res.status(404).json({
                message: 'No se encontraron tareas con ese usuario'
            });
        }
        return res.json({Tasks})
    } catch (error) {
        return res.status(500).json(
            {
                message: 'No se pudo obtener las tareas',
                errorBody: error.message
            }
        )
    }
};

//TODO:Creamos Tarea
CtrlTask.postTask = async (req, res) => {
    try {
        const idUser = req.user._id
        const {title,description, fecha, estado} = req.body;
        if(!idUser || !title || !description){
            return res.status(400).json({
                message:"La información proporcionada no es la adecuada.",
                opcionesObligatorias:["idUser", "title", "description"],
                opcionesAdicionales:["fecha","estado"]
            });
        }
        //TODO:Comprueba si existe el user para crear la tarea
        const User = await UserModel.findOne({_id:idUser})
        if(!User){
            return res.status(404).json({
                message: 'No existe el usuario para asignar la tarea'
            })
        };//TODO:Devuelve en caso de que no exista usuario que se quiera asignar a él
        const nuevaTarea = new TaskModel({
            title,
            description,
            fecha,
            estado,
            idUser
        });
        const tareaRegistrada = await nuevaTarea.save();
        return res.status(201).json({
            message: 'La tarea fue registrada exitosamente.',
            tareaRegistrada
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error con crear la nueva tarea",
            errorName: error.name,
            errorBody: error.message
        });
    }
};

//TODO:Modificamos una tarea

CtrlTask.putTask = async (req, res) => {
    try {
        const idTask = req.params.idTask;
        const userID = req.user._id;
        const {title, description, fecha, estado} = req.body;
        if(!idTask || !title || !description){
            return res.status(400).json({
                message:"No viene la ID o información requerida",
                opcionesObligatorias:["title", "description"],
                opcionesAdicionales:["fecha", "estado"],
                InformacionAdicional:"Recuerde que el id de la tarea tiene que estar despues de /task/"
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

        if((userIdString === tareaIdString)|| req.user.role === 'user_admin'){
            await Task.updateOne({title,description,fecha,estado})
            return res.status(201).json({
                message: 'La tarea fue actualizada exitosamente.',
            });
        }
        return res.status(401).json({
            message: 'No tiene permisos para editar la tarea',
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor y no pudo actualizar la tarea",
            error: error.message
        })
    }
};
//TODO:Modificamos una tarea

CtrlTask.completeTask = async (req, res) => {
    try {
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

        if((!(userIdString === tareaIdString)|| req.user.role === 'user_admin')){
            return res.status(401).json({
                message: 'No tiene permisos para modificar la tarea',
            })
        }
        if(Task.estado === 3){
            return res.status(400).json({
                message: 'La tarea ya fue completada con anterioridad.',
            });
        }
        await Task.updateOne({estado:3})
        return res.status(201).json({
            message: 'La tarea fue completada con éxito.',
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor y no pudo completar la tarea",
            error: error.message
        })
    }
};

//TODO:Elimino una tarea

CtrlTask.deleteTask = async (req, res) => {
    try {
        const idTask = req.params.idTask;
        const userID = req.user._id;

        const Task = await TaskModel.findOne({$and:[{_id:idTask},{isActive:true}]})
        if(!Task || !Task.isActive){
            return res.status(404).json({
                message: 'No existe la tarea'
            });
        }//TODO:Verifico si la tarea existe o está activa
        const userIDString = userID.toString() //recibo el userID que me pasa el validateJWT y lo convierto a STRING
        const tareaIDString = Task.idUser.toString()//recibo la propiedad idUser de la Task y lo convierto a STRING para luego comparar

        if(!((userIDString === tareaIDString)|| req.user.role === 'user_admin')) {
            return res.status(401).json({
                message: 'No está autorizado para eliminar esta tarea.'
            })
        }//TODO:Verifico si está autorizado el usuario por role o si es propietario de la tarea
        await Task.updateOne({isActive:false});
        return res.status(201).json({
            message: 'La tarea fue elimada correctamente.',
        })
    } catch (error) {
        return res.status(500).json({
            message: "Hubo un error con eliminar la tarea.",
            error: error.message
        })
    }
}

module.exports =CtrlTask;
        
