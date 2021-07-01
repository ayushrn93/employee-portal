const { check, validationResult } = require("express-validator");

exports.validationRules = () =>{
    return [   
        check("name").not().isEmpty().withMessage("Name is Required!"),

        check("salary").not().isEmpty().withMessage("Salary is required!")
        .isLength({
            min:6,
            max:10
        }).withMessage("Invalid Salary")
    ];
};

exports.validateEmployee = (req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const firstError = errors.array().map((err)=>err.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
}