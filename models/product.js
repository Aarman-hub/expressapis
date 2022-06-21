const mongoose = require('mongoose');
const {Schema} = mongoose;


const productSChema = new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    rechDescription:{
        type:String,
        default:''
    },
    image:{
        type:String,
    },
    images:[{
        type:String,
    }],
    brand:{
        type: String,
        default:''
    },
    price:{
        type: Number,
        default: 0
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required:true,
    },
    countInStock:{
        type: Number,
        required: true,
        min:0,
        max: 255
    },
    rating:{
        type:Number,
        default:0,
    },
    numReviews:{
        type:Number,
        default:0,
    },
    isFeatured:{
        type:Boolean,
        default: false,
    },
},{timestamps:true});

// productSChema.virtual('id').get(function(){
//     return this._id.toHexString();
// });

// productSChema.set('toJSON',{
//     virtuals:true,
// })


module.exports = mongoose.model('Product', productSChema);