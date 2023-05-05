//database functions for user 
const getPool = require('../databases/databaseconfigforuser.js');

//usernamelogin function to check if user exists
exports.checkusernamelogin = async function(username){
    try {
        const pool = await getPool().connect();
        const result = await pool.request()
          .input('username', username)
          .execute('checkusernamelogin');
      
        if (result.recordset[0].userexist < 1) {
          // User doesnt exist and cannot login
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

//email login function to check if user exists
exports.checkemaillogin = async function(email){
    try {
        const pool = await getPool().connect();
        const result = await pool.request()
        .input('email', email)
        .execute('checkemaillogin');
      
        if (result.recordset[0].userexist < 1) {
          // User doesnt exist and cannot login
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

exports.getuserpassword = async function(userinput){
try {
    const pool = await getPool().connect();
    const result = await pool.request()
    .input('input', userinput)
    .execute('getuserpassword');
    return result.recordset[0].password;
} catch (error) {
    return error;
}
}
exports.getdetailsfortoken = async function(value){
  try {
      const pool = await getPool().connect();
      const result = await pool.request()
      .input('identifier',value)
      .execute('getdetailsfortoken');
      return result.recordset[0];
  } catch (error) {
      return error;
  }
}
exports.getusernamefromemail = async function(email){
  try {
      const pool = await getPool().connect();
      const result = await pool.request()
      .input('email', email)
      .execute('getusernamefromemail');
      return result.recordset[0].username;
  } catch (error) {
      return error;
  }
}

exports.checkuserexistence=async function(userinput){
  try {
    const pool = await getPool().connect();
    const result = await pool.request()
    .input('input', userinput)
    .execute('checkuserexistence');
    return result.recordset;
  } catch (error) {
    return error
  }
}