const Employee  = require('../models/employee');
const { errorHandler } = require("../helpers/dbError");

exports.create = (req,res) =>{
    const employee = new Employee(req.body);
    employee.save((err,employee) =>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            });
        }
        res.json({employee});
    });
};

exports.read = (req,res) =>{
    return res.json(req.employee);
};

exports.update = (req,res) =>{
    let fields = {};
    for(key in req.body){
        if(req.body[key]!==""){
            fields[key]=req.body[key];
        }
    }
    Employee.findOneAndUpdate({_id:req.employee._id},{$set:fields},{new:true},(err,employee) =>{
        if(err){
            return res.status(400).json({error:"Unable to update the employee fields"});
        }
        res.json({employee});
    });
};

exports.remove = (req,res) =>{
    const employee = req.employee;
    employee.remove((err,deletedEmp) =>{
        if(err){
            return res.status(400).json({error:errorHandler(err)});
        }
        res.json({message:"Employee deleted successfully"});
    });
};

exports.employeeById = (req,res,next,id) =>{
    Employee.findById(id).exec((err,employee) =>{
        if(err||!employee){
            return res.status(400).json({error:"Employee not found!"});
        }
        req.employee = employee;
        next();
    });
};

exports.list = (req,res) =>{
    let limit = req.query.limit?parseInt(req.query.limit):5;
    let page = req.query.page?parseInt(req.query.page):1;
    let arg = {};
    if(req.query.search){
        arg["name"] = {$regex:`${req.query.search}`, $options:'i'};
    }
    Employee.find(arg)
        .limit(limit)
        .skip((page-1)*limit)
        .exec((err,employees) =>{
            if(err){
                return res.status(400).json({error:errorHandler(err)});
            }
            Employee.countDocuments(arg)
                .exec((err,total)=>{
                    if(err){
                        res.status(400).json({error:errorHandler(err)});
                    }
                    res.json({total,employees});
                })
        });
};