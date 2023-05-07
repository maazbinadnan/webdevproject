const jwt = require('../funcsusedbycontrollers/jwttoken.js');
const bcrypt = require('bcrypt'); 
const register=require('../funcsusedbycontrollers/registerfuncs.js');


exports.registeruser = async (req, res) => {
 try {
    if(!register.checkemail(req.body.email) && register.checkusername(req.body.username)){ //if email regex is incorrect and username regex is valid
        res.send("email is not valid");
    } else if(register.checkemail(req.body.email) && !register.checkusername(req.body.username)){// if username regex is incorrect 
        res.send("username shouldnt have spaces")
    }
     else if (register.checkemail(req.body.email) && await register.checkuserexist(req.body.username,req.body.email) && register.checkusername(req.body.username)) { //if both correct check if userexists already otherwise register user
        const hashedpassword = await bcrypt.hash(req.body.password, 10); //hash password
        const result = await register.registeruser(req.body.username,req.body.email,hashedpassword); //store password and register user
        const token = await jwt.createtoken(req.body.email,req.body.username);//create a token 
        console.log(result);
        res.json({
            token: token,
            message : "user created",
            redirect: "user redirected to " + req.body.username + "/home"
        }); //redirect to home page

    } else if (register.checkemail(req.body.email) && register.checkusername(req.body.username)) {
        const userexist=await register.checkuserexist(req.body.username,req.body.email);
        if(userexist==false){
            res.send("user already exists"); 
        }
      }    
 } catch (error) {
    res.send(error);
 }
}




