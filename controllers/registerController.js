const jwt = require('../funcsusedbycontrollers/jwttoken.js');
const bcrypt = require('bcrypt'); 
const register=require('../funcsusedbycontrollers/registerfuncs.js');


exports.registeruser = async (req, res) => {
 try {
    if(!register.checkemail(req.body.email)){
        res.send("email is not valid");
    } 
     else if (register.checkemail(req.body.email) && await register.checkuserexist(req.body.username,req.body.email)) {
        const hashedpassword = await bcrypt.hash(req.body.password, 10);
        const result = await register.registeruser(req.body.username,req.body.email,hashedpassword);
        const token = await jwt.createtokenemail(req.body.email);
        console.log(result);
        res.json({
            token: token,
            message : "user created",
            redirect: "user redirected to " + req.body.username + "/home"
        }); //redirect to home page

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




