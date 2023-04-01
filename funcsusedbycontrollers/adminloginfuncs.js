const getPoolforadmin = require('../databases/DBconfigforadmin');
exports.adminlogin = async function(email){
    try {
        const pool = await getPoolforadmin().connect();
        const result = await pool.request()
        .input('email', email)
        .execute('checkadminlogin');
        return result.recordset[0].adminpassword;
        } catch (err) {
        // Handle error
        return err;
        }
}