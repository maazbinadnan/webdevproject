//router for normal api
const express = require('express');
const router =express.Router();
const controller = require('../controllers/controller');
router.use(function(req,res,next){  //for any request it will go to this function first and log the time
    console.log('Time:',Date.now());
    next();
    
});
router.get("/maaz",controller.maaz); //after coming here it will check if there is any /maaz in the url after /api and then it will go to controller.maaz function
router.get("/ali",controller.ali);
router.get("/hello",controller.hello);
module.exports=router;