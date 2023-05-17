const getPool = require('../databases/databaseconfigforuser.js');
const sql = require('mssql')

exports.updatepassword = async function (username, password) {
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
exports.updateemail = async function (username, newemail) {
    try {

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
exports.getHpDetails = async function (username) {
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

exports.getmoviepages = async function (pagenum, pagesize, order, genre) {
    try {
        console.log(order)
        const pool = await getPool().connect();
        const result = await pool.request()
            .input('pagenum', pagenum)
            .input('pagesize', pagesize)
            .input('order', order)
            .input('genre', genre)
            .execute('moviepagination');
            console.log(result )
        return result;
    } catch (error) {
        console.log(error)
        return error;
    }
}
exports.requestmovie = async function (moviename, moviedirector, overview, genre, releaseDate) {
    try {
        const pool = await getPool().connect();
        const result = await pool.request()
            .input('moviename', moviename)
            .input('movieDirector', moviedirector)
            .input('overview', overview)
            .input('genre', genre)
            .input('releaseDate', releaseDate)
            .execute('requestmovie');
        return result;
    } catch (error) {
        return error;
    }

}
exports.addreview = async function (username, movieID, rating, comments) {
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
        console.log(error)
        return error;

    }
}

// movie search and filtering all calls
exports.searchmovies = async function (moviename, sortorder) { //by name
    try {
        const pool = await getPool().connect();
        const result = await pool.request()
            .input('movieName', moviename)
            .input('sortorder', sortorder)
            .execute('searchbymoviename');
        return result;
    } catch (error) {
        return error;
    }
}
exports.moviesbyDirector = async function (directorname, sortorder) { //by director
    try {
        const pool = await getPool().connect();
        const result = await pool.request()
            .input('director', directorname)
            .input('sortorder', sortorder)
            .execute('searchbydirector');
        return result;
    } catch (error) {
        return error;
    }
}
exports.moviesbyGenre = async function (genrename, sortorder) { //by genre
    try {
        const pool = await getPool().connect();
        const result = await pool.request()
            .input('genre', genrename)
            .input('sortorder', sortorder)
            .execute('searchbygenre');
        return result;
    } catch (error) {
        return error;
    }
}
exports.moviesbyReleaseYear = async function (year, sortorder) { //by releaseYear

    try {
        const pool = await getPool().connect();
        const result = await pool.request()
            .input('releaseDate', sql.VarChar, year)
            .input('sortorder', sortorder)
            .execute('searchbyear');
        return result;
    } catch (error) {
        return error;
    }
}
exports.moviesbyactor = async function (actorname, sortorder) {
    try {
        const pool = await getPool().connect();
        const result = await pool.request()
            .input('ActorName', actorname)
            .input('SortBy', sortorder)
            .execute('SearchMoviesbyActor');
        console.log(result)
        return result;

    } catch (error) {
        return error
    }
}
exports.gettotalrecords = async function (genre) {
    if (genre === '') {
        genre = null;
    }
    try {
        const pool = await getPool().connect();
        let result;
        if (genre) {
            result = await pool.request()
                .input('genre', sql.NVarChar(50), genre)
                .query('SELECT COUNT(*) AS total FROM movies WHERE genre = @genre');
        } else {
            result = await pool.request()
                .query('SELECT COUNT(*) AS total FROM movies');
        }
        return result.recordset[0].total;
    } catch (error) {
        return error;
    }
}


exports.getSingleMovie = async function (IMDBID, username) {
    try {
        const pool = await getPool().connect();
        const result = await pool.request()
            .input('IMDBID', IMDBID)
            .input('username', username)
            .execute('GetMovieDetailsAndActors')
        return result;
    } catch (error) {
        return error;
    }
}
//actors
exports.searchactorname = async function (actorname) {
    try {
        const pool = await getPool().connect();
        const result = await pool.request()
            .input('actorname', actorname)
            .execute('getActors')
            console.log(result)
        return result;
    } catch (error) {
        console.log(error)
        return error;
    }
}
exports.getsingleactor = async function (imdbID) {
    try {
        const pool = await getPool().connect();
        const result = await pool.request()
            .input('imdbID', imdbID)
            .execute('getSingleActorDetails')
        return result;
    } catch (error) {
        return error;
    }
}
exports.actorpagination = async function (pagesize, pagenumber) {

    try {
        const pool = await getPool().connect();
        const result = await pool.request()
            .input('pageSize', pagesize)
            .input('pageNumber', pagenumber)
            .execute('getallActors')
        return result;
    } catch (error) {
        return error;
    }
}
exports.getTotalactors= async function(){
    try {
        const pool = await getPool().connect();
        const result = await pool.request()
        .query('select count(*) as total from actors')
        return result;
    }catch(error){
        return error;
    }
}