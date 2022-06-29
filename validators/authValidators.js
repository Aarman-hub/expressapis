const {check, validationResult} = require('express-validator');


exports.SignupValidator = [
    check('username').trim().not().isEmpty().withMessage('Name is required'),    
    check('email').normalizeEmail().isEmail().withMessage('Email is unvalid'),    
    check('password').trim().not().isEmpty().withMessage('Password is missing').isLength({min:6, max:32})    
];

exports.SigninValidator = [   
    check('email').normalizeEmail().isEmail().withMessage('Give valid email'),    
    check('password').trim().not().isEmpty().withMessage('Password is missing').isLength({min:6, max:32})    
];

exports.validate = (req, res, next) =>{
    const error = validationResult(req).array();
    if(!error.length) return next();

    res.status(400).json({success: false, error: error[0].msg})
}