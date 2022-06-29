const mongoose = require('mongoose');
const {Schema} = mongoose;


const orderItemSChema = new Schema({
    quantity:{
        type:Number,
        required:true
    },
    product:{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
});


const OrderItem = mongoose.model("OrderItem",orderItemSChema);

module.exports = OrderItem;