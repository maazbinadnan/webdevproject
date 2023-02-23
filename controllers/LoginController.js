const bcrypt = require('bcrypt'); 
const register=require('../funcsusedbycontrollers/registerfuncs.js');
const login = require('../funcsusedbycontrollers/loginfuncs.js');
exports.login = async (req, res) => { //user can only login through email or username
    let usingusername=true; //create a button and toggle this variable
    try {
        if (usingusername) {
            switch (await login.checkusernamelogin(req.body.username)) {
                case true:
                    res.send("username exists");
                    break;
                case false:
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
                        res.send("user email exists");
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