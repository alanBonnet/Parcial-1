//Importado del modelo de tareas y Users
const TaskModel = require('../models/TASK');
const UserModel = require('../models/USER');
const CtrlTask = {};
// Controlador que Trae Todas las tareas
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
//Obtenemos las tareas de un usuario
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

//Creamos Tarea
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
        //Comprueba si existe el user para crear la tarea
        const User = await UserModel.findOne({_id:idUser})
        if(!User){
            return res.status(404).json({
                message: 'No existe el usuario para asignar la tarea'
            })
        };//Devuelve en caso de que no exista usuario que se quiera asignar a él
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

//Modificamos una tarea

CtrlTask.putTask = async (req, res) => {
    try {
        const Task = req.task;
        const {title, description, fecha, estado} = req.body;
        if(!req.params.idTask || !title || !description){
            return res.status(400).json({
                message:"No viene la ID o información requerida",
                opcionesObligatorias:["title", "description"],
                opcionesAdicionales:["fecha", "estado"],
                InformacionAdicional:"Recuerde que el id de la tarea tiene que estar despues de /task/"
            })
        }
        await Task.updateOne({title,description,fecha,estado})
        return res.status(201).json({
            message: 'La tarea fue actualizada exitosamente.',
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor y no pudo actualizar la tarea",
            error: error.message
        })
    }
};
//Modificamos una tarea

CtrlTask.completeTask = async (req, res) => {
    try {
        const Task = req.task
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

//Elimino una tarea

CtrlTask.deleteTask = async (req, res) => {
    try {
        const Task = req.task;
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
        
