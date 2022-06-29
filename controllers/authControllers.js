const User = require('../models/user');
const Jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { generateOTP } = require('../utils/mail');
const VerificationToken = require('../models/verificationTokenSchema');



exports.signup = async (req, res) =>{
    try {
        const {username, email, password, phone} = req.body;

        if(!username || !email || !password || !phone){
            res.status(400).json({msg: "Field must not be empty!"})
        }

        let user = await User.findOne({email});

        if(user){
            res.status(400).json({msg:"User already exists"})
        };

        user = new User({
            username,
            email,
            password,
            phone
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt)

        const OTP = generateOTP()
        const varificationToken = new VerificationToken({
            owner: user._id,
            token: OTP,
        });

        await varificationToken.save()

        await user.save();

        res.send(user);
        // const payload = {
        //     user:{
        //         id: user._id,
        //         username: user.username,
        //         email: user.email
        //     }
        // }

        // Jwt.sign(payload, process.env.JWTSECRET, {expiresIn:'5d'}, (err, token)=>{
        //     if(err) throw err;
        //     res.json({token})
        // })

        // res.status(200).json({msg:"User created"})
    } catch (err) {
        return res.status(400).json({msg: "Internal server error."})
    }
}
exports.signin = async (req, res) =>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({msg: "Email and password is required!"});
    }

    const user = await User.findOne({email});

    if(!user){
        res.status(400).json({msg: "User not exist"})
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match){
        res.status(400).json({msg: "password not match!"})
    }
    
    const payload = {
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    }

    Jwt.sign(payload, process.env.JWTSECRET, {expiresIn:'5d'}, (err, token)=>{
        if(err) throw err;
        res.json({token})
    })

}