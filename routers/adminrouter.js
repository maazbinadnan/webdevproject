const express = require('express');
const admin = express.Router();
const adminController=require('../controllers/adminController')
const jwt = require('../funcsusedbycontrollers/jwttoken.js');

admin.use(async function(req,res,next){ //first middleware to check if the token is valid and username in request matches with the one in token
    try{
    const token = req.headers.authorization.split(" ")[1];
    decodedtoken = await jwt.getpayloadforadmin(token);
    console.log(decodedtoken); 
    if (decodedtoken.user == 'admin') { //check if the token is for admin
        next();
    }}catch(error){
        res.send("no token found");
    }
})
admin.post('/addmovie',adminController.insertmovie_actor)
admin.post("/addactor",adminController.insertactor)
admin.delete("/users/:username",adminController.deleteuser)
admin.get("/movierequests",adminController.movierequests)
admin.get("/wikistoapprove",adminController.getallwikistoapprove)
admin.get("/allwikis",adminController.getallwikis)
admin.post("/wiki",adminController.postwiki)
admin.delete("/wiki/:_id",adminController.deletewiki)
module.exports = admin