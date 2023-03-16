const getPool = require('../databases/databaseconfigforuser.js');

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
exports.searchmovies=async function(moviename){
    try {
    const pool = await getPool().connect();
    const result = await pool.request()
    .input('movie_name', moviename)
    .execute('search_movies');
    return result;
}catch (error) {
    return error;
}
}

exports.getmoviepages= async function(pagenum, pagesize){
    try {
    const pool = await getPool().connect();
    const result = await pool.request()
    .input('pagenum', pagenum)
    .input('pagesize', pagesize)
    .execute('moviepagination');
    return result;
    } catch (error) {
        return error;
    }
}
exports.requestmovie=async function(moviename,moviedirector){
    try {
    const pool = await getPool().connect();
    const result = await pool.request()
    .input('moviename', moviename)
    .input('movieDirector', moviedirector)
    .execute('requestmovie');
    return result;
    } catch (error) {
        return error;
    }

}
exports.addreview = async function(username,movieID,rating,comments){
    try {
        const pool = await getPool().connect();
        const result = await pool.request()
        .input('username', username)
        .input('movieID', movieID)
        .input('rating', rating)
        .input('comments', comments)
        .execute('addreview');
        return result;
        } catch (error) {
            return error;
        }
}