const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const verificationTokenSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    token:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        expire: 3600,
        default: Date.now()
    }
});

verificationTokenSchema.pre("save", async function (next){

    if(this.isModified("token")){
        const hash = await bcrypt.hash(this.token, 0);
        this.token = hash;
    }

    next();
});

verificationTokenSchema.method.verificationTokenSchema = async function (token) {
    const result = await bcrypt.compare(token, this.token);
    return result;
};

const VerificationToken = mongoose.model("VerificationToken", verificationTokenSchema);
 
module.exports = VerificationToken;