const express = require('express');
const LoginController = require('../controllers/adminlogincontroller.js');
const loginadmin = express.Router();
loginadmin.post("/admin", LoginController.login);
module.exports=loginadmin