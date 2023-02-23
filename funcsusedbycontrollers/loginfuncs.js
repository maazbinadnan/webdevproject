const getPool = require('../databases/databaseconfig.js');

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