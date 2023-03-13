//router for user actions
const jwt = require('../funcsusedbycontrollers/jwttoken.js');
const express = require('express');
const router =express.Router();
const wikicontroller = require('../controllers/UserWikiController');
let email;
router.use( async function(req,res,next){  //for any request it will go to this function first and log the time
    const token = req.headers.authorization.split(" ")[1];
    if (await jwt.verifytokenuser(token)) {
        const xxx = await jwt.getpayload(token);
        console.log(xxx);
        next(); //move to next function if token is valid 
    } else {
        res.send("not authorized");
    }
});
router.get("/wikipage",wikicontroller.wikipage);

module.exports=router;