const mongoose = require('mongoose');
const {Schema} = mongoose;


const userSChema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    avater:{
        type:String,
        default:"",
    },
    phone:{
        type:String,
        required:true
    },
    street:{
        type:String,
        default:''
    },
    apartment:{
        type:String,
        default:''
    },
    zip:{
        type:String,
        default:''
    },
    city:{
        type:String,
        default:''
    },
    country:{
        type:String,
        default:''
    }
},{timestamps:true});


module.exports = mongoose.model('User', userSChema);