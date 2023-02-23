// This is the router for the database connection
const DBcontroller = require('../controllers/controllerforDB');
const express = require('express');
const router2 = express.Router();
router2.post("/register",DBcontroller.registeruser);//after coming here it will check if there is any /alldata in the url after /database and then it will go to DBcontroller.alldata function
router2.get("/getallusers",DBcontroller.getallusers);
module.exports=router2