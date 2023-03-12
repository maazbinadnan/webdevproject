const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.createtokenusername= async function(username){
    const token = jwt.sign({ username: username, user: 'cinephile'}, process.env.secretkey, { expiresIn: '72h' });    //creates a user token
    return token;
}

exports.createtokenemail= async function(email){
    const token = jwt.sign({email: email, user: 'cinephile'}, process.env.secretkey, {expiresIn: '72h'});   //creates a user token
    return token;
}

exports.verifytokenuser = async function(token){
    try { 
        const decoded = jwt.verify(token, process.env.secretkey); //verify the token
        if (decoded.user == 'cinephile') { //check if the token is for cinephile
            return true;
        } else {
            return false;
        }
        
    } catch (error) {
        console.log("no token found");
    }
}