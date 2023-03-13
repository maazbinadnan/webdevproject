const homerouter = require('express').Router();
const jwt = require('../funcsusedbycontrollers/jwttoken.js');

homerouter.use( async function(req,res,next){ 
    
}) //for any request it will go to this function first and log the time