const User = require('../models/user');
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = (req,res) =>{
    console.log("req.body:",req.body);
    const user = new User(req.body);

    user.save((err,user)=>{
        if(err){
            return res.status(400).json({error:"Email exists already!"});
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({user});
    });
};

exports.signin = (req,res) =>{
    const {email,password} = req.body;

    User.findOne({email},(err,user)=>{
        if( err || !user){
            return res.status(400).json({
                error:"Email or Password is incorrect"
            });
        }
        if( !user.authenticate(password)){
            return res.status(401).json({
                error:"Email or Password is incorrect"
            });
        }
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);

        res.cookie("t",token,{expire:new Date()+9999});

        const { _id,name,email,role } = user;

        return res.json({token,user:{ _id,name,email,role }});
    });
};

exports.signout = (req,res) =>{
    res.clearCookie("t");
    res.json({message:"User signed out successfully!"});
};

exports.requireSignin = expressJwt({
    secret:process.env.JWT_SECRET,
    algorithms:["HS256"],
    userProperty:"auth"
});

exports.isAuth = (req,res,next) =>{
    const user = req.profile&&req.auth&&(req.profile._id==req.auth._id);
    if(!user){
        return res.status(403).json({error:"Access Denied"});
    }
    next();
};

exports.isAdmin = (req,res,next) =>{
    if(req.profile.role==0){
        return res.status(403).json({error:"Admin resource! Access Denied"});
    }
    next();
};