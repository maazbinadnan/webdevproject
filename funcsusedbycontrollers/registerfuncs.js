const getPool = require('../databases/databaseconfigforuser.js');
const emailregex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//usernamelogin function to check if user exists
 exports.checkuserexist = async function(username,email){
    try {
        const pool = await getPool().connect();
        const result = await pool.request()
          .input('username', username)
          .input('email', email)
          .execute('checkuserexistence');
      
        if (result.recordset[0].usernum > 0) {
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

exports.registeruser= async function(username,email,password){
    try {
        const pool = await getPool().connect();
        await pool.request()
            .input('username', username)
            .input('email', email)
            .input('password', password)
            .execute('registervaliduser');
            } catch (error) {
        return error;
    }
}

exports.checkemail= function (email){
    if(emailregex.test(email)){
        return true;
    }else{
        return false;
    }
}

