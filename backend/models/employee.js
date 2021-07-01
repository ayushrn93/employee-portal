const mongoose = require('mongoose');
const crypto = require('crypto')
const uuidv1 = require('uuidv1')

const employeeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    salary:{
        type: Number,
        required: true,
        trim: true
    },
    gender:{
        type: String,
        required: true
    },
    team:{
        type: String,
        required: true,
        trim: true
    },
    address:{
        type: String,
        trim:true
    }
},{timestamps:true});

module.exports = mongoose.model('Employee',employeeSchema);