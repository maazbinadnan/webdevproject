const bcrypt = require('bcrypt'); 
const register=require('../funcsusedbycontrollers/registerfuncs.js');
const adminloginfuncs = require('../funcsusedbycontrollers/adminloginfuncs.js');
const jwt = require('../funcsusedbycontrollers/jwttoken.js');

exports.login = async (req, res) => {
 try {
    if (register.checkemail(req.body.email)) {
    console.log("in try")
    result = await adminloginfuncs.adminlogin(req.body.email)
    console.log(result)
    if(await bcrypt.compare(req.body.password,result)){
        const token = await jwt.createadmintoken(req.body.email) // issue  jwt token
        res.json({ //redirecting user to his home page
            token: token,
            message : "user logged in",
            redirect: "user redirected to " + "admin" + "/home"
        });
    }else{
        res.send("password or email is incorrect");
    }   
}else{
    res.send("password or email is incorrect")
}
 } catch (error) {
    console.log(error)
 }    
} 

 //user can only login through email 