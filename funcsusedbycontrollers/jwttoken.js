const jwt = require('jsonwebtoken');
const loginfuncs=require('../funcsusedbycontrollers/loginfuncs.js');
require('dotenv').config();

exports.createtokenusername= async function(username){
    const details = await loginfuncs.getdetailsfortoken(username); //get email from database
    const token = jwt.sign({ email: details.email, username:username, user: 'cinephile'}, process.env.secretkey, { expiresIn: '72h' });    //creates a user token
    return token;
}

exports.createtokenemail= async function(email){
    const details = await loginfuncs.getdetailsfortoken(email); //get email from database
    const token = jwt.sign({email: email, username: details.username , user: 'cinephile'}, process.env.secretkey, {expiresIn: '72h'});   //creates a user token
    return token;
}


exports.getpayloadforuser = async function(token){
    try { 
        const decoded = jwt.verify(token, process.env.secretkey); //verify the token
        if (decoded.user == 'cinephile') { //check if the token is for cinephile
            return decoded;
        } else {
            return false;
        }
        } catch (error) {
        console.log("no token found");
    }
}
exports.createadmintoken= async function(email){
     //get email from database
    const token = jwt.sign({ email: email, user: 'admin'}, process.env.secretkey, { expiresIn: '72h' });    //creates an admin token
    return token;
}
exports.getpayloadforadmin = async function(token){
    try { 
        const decoded = jwt.verify(token, process.env.secretkey); //verify the token
        if (decoded.user == 'admin') { //check if the token is for cinephile
            return decoded;
        } else {
            return false;
        }
        } catch (error) {
        console.log("no token found");
    }
}
