const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const userRoutes = require("./routes/auth");
const employeeRoutes = require("./routes/employee");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected to the DB");
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(cors());

app.use("/api",userRoutes);
app.use("/api",employeeRoutes);

const port = process.env.port||8000;

app.listen(port,()=>{console.log(`Server is running on port ${port}`)});