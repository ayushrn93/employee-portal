const express = require('express');
const router  = express.Router();

const { validationRules, validateEmployee } = require('../validator/employee');
const { employeeById, read, update, create, list, remove } = require('../controllers/employee');
const { userById } = require('../controllers/user');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');

router.get("/employees",list);
router.get("/employee/:employeeId",requireSignin,isAuth,read);
router.post("/employee/create/:userId",requireSignin,isAuth,validationRules(),validateEmployee,create);
router.put("/employee/:employeeId/:userId",requireSignin,isAuth,update);
router.delete("/employee/:employeeId/:userId",requireSignin,isAuth,remove);

router.param("userId",userById);
router.param("employeeId",employeeById);

module.exports = router;