//TODO:Importado del modelo de tareas
const TaskModel = require('../models/TASK');

const CtrlTask = {};
//TODO: Controlador que Trae Todas las tareas
CtrlTask.getTasks = async (req, res) => {
    try {
        const Tasks = await TaskModel.find({isActive: true});

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
        const idUser = req.params.idUser;
        const Tasks = await TaskModel.find({idUser})
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
        const {idUser,title,description, fecha, estado} = req.body;
        if(!idUser || title || description){
            return res.status(400).json({
                message:"La información proporcionada no es la adecuada.",
                opcionesObligatorias:["idUser", "title", "description"],
                opcionesAdicionales:["fecha","estado"]
            });
        }
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
        const userID = req?.user?._id;
        const {title, description, fecha, estado} = req.body;
        if(!idTask || title || description){
            return res.status(400).json({
                message:"No viene la ID o información requerida",
                opcionesObligatorias:["title", "description","fecha", "estado"],
                InformacionAdicional:"Recuerde que el id de la tarea tiene que estar despues de /task/"
            })
        }
        const Task = await TaskModel.findById(idTask);

        const userIdString = userID.toString();
        const tareaIdString = idTask.idUser.toString();

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

//TODO:Elimino una tarea

CtrlTask.deleteTask = async (req, res) => {
    try {
        const idTask = req.params.idTask;
        const userID = req?.user?._id;

        const Task = await TaskModel.findOne({$and:[{_id:idTask},{isActive:true}]})

        const userIDString = userID.toString() //recibo el userID que me pasa el validateJWT y lo convierto a STRING
        const tareaIDString = Task.idUser.toString()//recibo la propiedad idUser de la Task y lo convierto a STRING para luego comparar

        if((userIDString === tareaIDString)|| req.user.role === 'user_admin') {
            await Task.updateOne({isActive:false});
            return res.status(201).json({
                message: 'La tarea fue elimada correctamente.',
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Hubo un error con eliminar la tarea.",
            error: error.message
        })
    }
}

module.exports =CtrlTask;
        
