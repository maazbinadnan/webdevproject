const RegController = require('../controllers/registerController');
const express = require('express');
const registerrouter = express.Router();
registerrouter.post("/register",RegController.registeruser); //after coming here it will check if there is any /alldata in the url after /database and then it will go to RegController.alldata function
module.exports=registerrouter