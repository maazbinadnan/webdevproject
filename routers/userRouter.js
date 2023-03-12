//router for user actions
const jwt = require('../funcsusedbycontrollers/jwttoken.js');
const express = require('express');
const router =express.Router();
const usercontroller = require('../controllers/Usercontroller');

router.use( async function(req,res,next){  //for any request it will go to this function first and log the time
    const token = req.headers.authorization.split(" ")[1];
    if (await jwt.verifytokenuser(token)) {
        next(); //move to next function if token is valid 
    } else {
        res.send("not authorized");
    }
});
router.get("/wikipage",usercontroller.wikipage);

module.exports=router;