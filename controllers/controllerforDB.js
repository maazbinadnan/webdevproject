const getPool = require('../databases/databaseconfig.js');
const mssql = require('mssql');
const bcrypt = require('bcrypt'); 
const emailregex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


exports.registeruser = async (req, res) => {
 try {
    if(!checkemail(req.body.email)){
        res.send("email is not valid");
    } 
     else if (checkemail(req.body.email) && await checkuserexist(req.body.username,req.body.email)) {
        const hashedpassword = await bcrypt.hash(req.body.password, 10);
        await registeruser(req.body.username,req.body.email,hashedpassword);
        res.send("user registered");
    } else if (checkemail(req.body.email)) {
        const userexist=await checkuserexist(req.body.username,req.body.email);
        if(userexist==false){
            res.send("user already exist");
        }
      }    
 } catch (error) {
    res.send(error);
 }
}

async function checkuserexist(username,email){
    try {
        const pool = await getPool().connect();
        const result = await pool.request()
          .input('username', username)
          .input('email', email)
          .query('SELECT * FROM users WHERE username = @username OR email = @email');
      
        if (result.recordset.length > 0) {
          // User already exists
          return false;
        } else {
          // No user found
          return true;
        }
      } catch (err) {
        // Handle error
        return err;
      }
}

async function registeruser(username,email,password){
    try {
        const pool = await getPool().connect();
        await pool.request()
            .input('username', username)
            .input('email', email)
            .input('password', password)
            .query('INSERT INTO users (username, email, password) VALUES (@username, @email, @password)');//INSERT INTO users (username, email, password) VALUES (@username, @email, @password)
            } catch (error) {
        return error;
    }
}

function checkemail(email){
    if(emailregex.test(email)){
        return true;
    }else{
        return false;
    }
}
    



