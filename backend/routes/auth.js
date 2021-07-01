const express = require('express');
const router  = express.Router();

const { validationRules, validateUser } = require('../validator/user');
const { signup, signin, signout } = require('../controllers/auth');

router.post("/signup",validationRules(),validateUser,signup);
router.post("/signin",signin);
router.get("/signout",signout);


module.exports = router;