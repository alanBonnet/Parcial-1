const { model, Schema } = require('mongoose');

const UserModel = new Schema({
    username:{
        type: String,
        min:8,
        required: true,
        unique: true
    },
    password:{
        type: String,
        min:8,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    isActive:{
        type: Boolean,
        default: true
    },
    role:{
        type: String,
        default: 'user_normal'
    }
},{
    timestamps:true,
    versionKey:false
})

module.exports = model('Users', UserModel);