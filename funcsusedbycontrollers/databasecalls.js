const getPool = require('../databases/databaseconfigforuser.js');
const sql = require('mssql') 

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

exports.getmoviepages= async function(pagenum, pagesize,order){
    try {
    const pool = await getPool().connect();
    const result = await pool.request()
    .input('pagenum', pagenum)
    .input('pagesize', pagesize)
    .input('order',order)
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
 
 // movie search and filtering all calls
exports.searchmovies=async function(moviename,sortorder){ //by name
    try {
    const pool = await getPool().connect();
    const result = await pool.request()
    .input('movieName', moviename)
    .input('sortorder', sortorder)
    .execute('searchbymoviename');
    return result;
}catch (error) {
    return error;
}
}
exports.moviesbyDirector= async function(directorname,sortorder){ //by director
    try {
        const pool = await getPool().connect();
        const result = await pool.request()
        .input('director', directorname)
        .input('sortorder', sortorder)
        .execute('searchbydirector');
        return result;
    }catch (error) {
        return error;
    }
}
exports.moviesbyGenre= async function(genrename,sortorder){ //by genre
    try {
        const pool = await getPool().connect();
        const result = await pool.request()
        .input('genre', genrename)
        .input('sortorder', sortorder)
        .execute('searchbygenre');
        return result;
    }catch (error) {
        return error;
    }
}
exports.moviesbyReleaseYear= async function(year,sortorder){ //by releaseYear
    try {
        const pool = await getPool().connect();
        const result = await pool.request()
        .input('releaseDate',sql.Int, year)
        .input('sortorder', sortorder)
        .execute('searchbyear');
        return result;
    }catch (error) {
        return error;
    }
}
