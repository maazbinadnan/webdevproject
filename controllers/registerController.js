const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const register=require('../funcsusedbycontrollers/registerfuncs.js');
const login = require('../funcsusedbycontrollers/loginfuncs.js');

exports.registeruser = async (req, res) => {
 try {
    if(!register.checkemail(req.body.email)){
        res.send("email is not valid");
    } 
     else if (register.checkemail(req.body.email) && await register.checkuserexist(req.body.username,req.body.email)) {
        const hashedpassword = await bcrypt.hash(req.body.password, 10);
        const result = await register.registeruser(req.body.username,req.body.email,hashedpassword);
        console.log(result);
        res.send("user registered");

    } else if (register.checkemail(req.body.email)) {
        const userexist=await register.checkuserexist(req.body.username,req.body.email);
        if(userexist==false){
            res.send("user already exists");
        }
      }    
 } catch (error) {
    res.send(error);
 }
}

exports.getallusers = async (req, res) => {
    const result = await login.getpasswordfromusername(req.body.username);
    console.log(result);
    res.send(result);
}
    



