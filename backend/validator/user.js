const { check, validationResult } = require("express-validator");

exports.validationRules = () =>{
    return [   
        check("name").not().isEmpty().withMessage("Name is Required!"),

        check("email").not().isEmpty().withMessage("Email is required!")
        .isEmail().withMessage("Invalid Email!")
        .isLength({
            min:6,
            max:32
        }).withMessage("Email address should be between 6 and 32 characters"),

        check("password").not().isEmpty().withMessage("Password is Required!")
        .isLength({min:6}).withMessage("Password should contain at least 6 characters")
        .matches(/\d/).withMessage("Password must contain at least one digit")
    ];
};

exports.validateUser = (req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const firstError = errors.array().map((err)=>err.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
}