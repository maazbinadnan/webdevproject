const bcrypt = require('bcrypt');
const register = require('../funcsusedbycontrollers/registerfuncs.js');
const login = require('../funcsusedbycontrollers/loginfuncs.js');
const jwt = require('../funcsusedbycontrollers/jwttoken.js');

exports.login = async (req, res) => { //user can only login through email or username

    try {
        const result = await login.checkuserexistence(req.body.userinput) 
        console.log(result)
        // console.log(result[0].email)
        console.log(result.length)
        if (result.length == 0) {
            res.send("username or password is invalid");
        }else{
            if (await bcrypt.compare(req.body.password, await login.getuserpassword(req.body.userinput))) { // compare db password with password entered thru login
                token = await jwt.createtoken(result[0].email,result[0].username);// issue  jwt token
                console.log(token);
                res.json({
                    token: token,
                    message: "user logged in",
                    redirect: "user redirected to " + result[0].username + "/home" //redirecting user to his home page
                });
            } else {
                res.send("username or password is invalid");
            }
        }
        // switch (result) {
        //     case result: //if username exists
        //         if (await bcrypt.compare(req.body.password, await login.getuserpassword(req.body.userinput))) { // compare db password with password entered thru login
        //             token = await jwt.createtoken(result.email,result.username);// issue  jwt token
        //             console.log(token);
        //             res.json({
        //                 token: token,
        //                 message: "user logged in",
        //                 redirect: "user redirected to " + req.body.username + "/home" //redirecting user to his home page
        //             });
        //         } else {
        //             res.send("password or username is incorrect");
        //         }
        //         break;
        //     case false: //if username doesnt exist
        //         res.send("username doesnt exist");
        //         break;
        //     default:
        //         res.send("error");
        //         break;
        // }


    } catch (error) {
        res.send(error);
    }
}