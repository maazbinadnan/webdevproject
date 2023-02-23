//const getPool = require('../databases/databaseconfig.js');
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
        await register.registeruser(req.body.username,req.body.email,hashedpassword);
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
exports.login = async (req, res) => { //user can only login through email or username
    let logginginusingusername=false;
    try {
        if (logginginusingusername) {
            
        } else {
            
        }
    } catch (error) {
            res.send(error);
    }
}


exports.getallusers = async (req, res) => {
   await getPool().connect();
    const result = await getPool().request()
    .input('username', req.body.username)
    .execute('checkusernamelogin');
    const result2 = await getPool().request()
    .input('email', req.body.email)
    .execute('checkemaillogin');
    console.log(result.recordset[0].userexist);
    console.log(result2.recordset[0].userexist);
}
    



