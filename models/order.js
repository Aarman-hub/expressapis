const mongoose = require('mongoose');
const {Schema} = mongoose;


const orderSchema = new Schema({
    orderItems: [{
        type: Schema.Types.ObjectId,
        ref:'OrderItem',
        required:true
    }],
    shippingAddress1:{
        type:String,
        required:true,
    },
    shippingAddress2:{
        type:String
    },
    city:{
        type:String,
        required:true
    },
    zipCode:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
        default:"Pending"
    },
    totalPrice:{
        type:Number,
    },
    user:{
        type:Schema.types.ObjectId,
        ref:"User"
    },
    dateOrdered:{
        type:Date,
        default: Date.now(),
    }
});


orderSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
orderSchema.set('toJSON', {
    virtuals:true,
})


const Order = mongoose.model("Order",orderSChema);

module.exports = Order;