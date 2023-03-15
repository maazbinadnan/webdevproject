const homerouter = require('express').Router();
const jwt = require('../funcsusedbycontrollers/jwttoken.js');
const HPcontroller = require('../controllers/UserHpController');

homerouter.use(async function(req,res,next){ //first middleware to check if the token is valid and username in request matches with the one in token
    try{
    const token = req.headers.authorization.split(" ")[1];
    decodedtoken = await jwt.getpayload(token);
    console.log(decodedtoken.username);
    if (decodedtoken.user == 'cinephile') { //check if the token is for cinephile
        if (decodedtoken.username==req.username) {

            next();
        } else {
            res.send("username not matching w token");
        } 
    } else {
        res.send("not authorized");
    }}catch(error){
        res.send("no token found");
    }
})
homerouter.get("/home",HPcontroller.showHpdetails); 
homerouter.post("/changepassword",HPcontroller.changepassword);
homerouter.post("/changeemail",HPcontroller.changeemail);
module.exports=homerouter