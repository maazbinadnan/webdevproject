const bcrypt = require('bcrypt'); 
const register=require('../funcsusedbycontrollers/registerfuncs.js');
const login = require('../funcsusedbycontrollers/loginfuncs.js');

exports.login = async (req, res) => { //user can only login through email or username
    let usingusername=false; //create a button and toggle this variable
    try {
        if (usingusername) {
            switch (await login.checkusernamelogin(req.body.username)) {
                case true: //if username exists
                    if (await bcrypt.compare(req.body.password, await login.getpasswordfromusername(req.body.username))) { // compare db password with password entered thru login
                     res.send("user logged in");  // replace with cookie and jwt                             
                    } else {
                    res.send("password is incorrect");
                    }
                    break;
                case false: //if username doesnt exist
                    res.send("username doesnt exist");
                    break;
                default:
                    res.send("error");
                    break;
            }

        } else {
            if (register.checkemail(req.body.email)) {
                switch (await login.checkemaillogin(req.body.email)) {
                    case true:
                        if (await bcrypt.compare(req.body.password, await login.getpasswordfromemail(req.body.email))) {
                            res.send("user logged in"); //replace with cookie and jwt
                        }else{
                            res.send("password is incorrect");
                        }
                        break;
                    case false:
                        res.send("user email doesnt exist");
                        break;
                }
            } else {
                res.send("email is not valid");
                
            }
        }
    } catch (error) {
            res.send(error);
    }
}