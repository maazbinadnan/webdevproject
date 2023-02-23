// This is the router for the database connection
const RegController = require('../controllers/registerController');
const LoginController = require('../controllers/LoginController');
const express = require('express');
const router2 = express.Router();
router2.post("/register",RegController.registeruser); //after coming here it will check if there is any /alldata in the url after /database and then it will go to RegController.alldata function
router2.get("/getallusers",RegController.getallusers);
router2.post("/login",LoginController.login);
module.exports=router2