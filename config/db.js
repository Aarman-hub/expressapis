const mongoose = require('mongoose');



const connectDB = async () =>{
    const db = process.env.MONGODB_URI
    try {
        await mongoose.connect(db, {useNewUrlParser:true});
        console.log('DB Connected.')
    } catch (error) {
        process.exit(1)
    }
}

module.exports = connectDB;