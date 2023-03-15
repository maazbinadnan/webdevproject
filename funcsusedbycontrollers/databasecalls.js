const getPool = require('../databases/databaseconfig.js');

exports.updatepassword = async function(username, password){
    try {
        const pool = await getPool().connect();
        const result = await pool.request()
          .input('username', username)
          .input('newPassword', password)
          .execute('UpdateUserPassword');
        return true;         
        } catch (error) {
        return false;
    }
}
exports.updateemail = async function(username,newemail){
    try{
        
    const pool = await getPool().connect();
    const result = await pool.request()
        .input('username', username)
        .input('newEmail', newemail)
        .execute('UpdateUserEmail');
    return result.recordset[0].Result;
    } catch (error) {
        return false;
    }
}
exports.getHpDetails = async function(username){
    try {
    const pool = await getPool().connect();
    const result = await pool.request()
    .input('username', username)
    .execute('userHPdetails');
    return result;
    } catch (error) {
        return error;
    }
}