const {model,Schema}= require('mongoose');

const TaskModel = new Schema({
    title:{
        type:String,
        max:60,
        required:true
    },
    description:{
        type:String,
        max:250,
        required:true
    },
    fecha:{
        type:Date,
        default:new Date()
    },
    estado:{
        type:Number,
        min:0,
        max:4,
        default:1
    },
    isActive:{
        type:Boolean,
        default:true
    },
    idUser:{
        type:Schema.ObjectId,
        ref: 'Users',
        required:true
    }

    },{
        timestamps:true,
        versionKey:false   
    }
);


module.exports = model("Tasks", TaskModel);