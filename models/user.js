const mongoose = require('mongoose');
const {Schema} = mongoose;


const userSChema = new Schema({

},{timestamps:true});


module.exports = mongoose.model('User', userSChema);