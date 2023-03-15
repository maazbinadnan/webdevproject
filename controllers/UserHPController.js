const bcrypt = require('bcrypt');
const login = require('../funcsusedbycontrollers/loginfuncs.js');
const databasecalls = require('../funcsusedbycontrollers/databasecalls.js');
const emailregex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const jwt = require('jsonwebtoken');

exports.showHpdetails = async function(req,res){
  const details = await databasecalls.getHpDetails(req.username);
  res.json(details.recordsets);
}

// user home page controller
exports.changepassword = async function(req,res){
    const newhashedpass= await bcrypt.hash(req.body.newpassword, 10);
  if (await bcrypt.compare(req.body.oldpassword, await login.getpasswordfromusername(req.username))) { // if old password is correct

    if (await databasecalls.updatepassword(req.username,newhashedpass)) {
        res.send("password changed successfully")
    } else {
        res.send("error changing password")
    }
  }  else {
    res.send("old password is incorrect");
  }

}
      
exports.changeemail = async function(req,res){
 
 if (emailregex.test(req.body.newemail)) {
    const result = await databasecalls.updateemail(req.username,req.body.newemail);
    if (result==1) { //if email successfully changed in database
      const token = jwt.sign({email: req.body.newemail, username: req.username , user: 'cinephile'}, process.env.secretkey, {expiresIn: '72h'});//issue new token
      res.json({
        token: token,
        message: "email changed successfully and token updated"
      });
    } else {
      res.json({ //if email not changed in database
        message: "error changing email"
      });
    }
}else{
    res.send("email format is not valid");
}
}