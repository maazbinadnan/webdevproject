const databasecalls = require('../funcsusedbycontrollers/USERdatabasecalls.js');


 exports.searchmoviebydirector=async function(req,res){ //director
    console.log(req.params.directorname)
    try {
        const result = await databasecalls.moviesbyDirector(req.query.directorname,req.query.sortorder);
        console.log(result)
        res.json(result.recordsets);    
    } catch (error) {
        res.json(error);    
    }
    
}

exports.searchmoviesbyname=async function(req,res){ //name
    try {
        const result = await databasecalls.searchmovies(req.query.moviename,req.query.sortorder);
        res.json({result:result.recordsets[0]});    
    } catch (error) {
        res.json(error);    
    }
    
}
//searchmoviesbyyear
exports.searchmoviesbyyear=async function(req,res){ //year
    console.log(req.params.year)
    try {
        const result = await databasecalls.moviesbyReleaseYear(req.query.year,req.query.sortorder);
        console.log(result)
        res.json(result.recordsets);    
    } catch (error) {
        res.json(error);    
    }
    
}
//searchmoviesbygenre
exports.searchmoviesbygenre=async function(req,res){ //genre
    console.log(req.params.genre)
    try {
        const result = await databasecalls.moviesbyGenre(req.query.genre,req.query.sortorder);
        res.json(result.recordsets);    
    } catch (error) {
        res.json(error);    
    }
    
}

//searchmoviesbyyear
exports.searchmoviesbyyear=async function(req,res){ 
    console.log(req.params.year)
    try {
        const result = await databasecalls.moviesbyReleaseYear(req.query.year,req.query.sortorder);
        console.log(result)
        res.json(result.recordsets);

}catch(error){
    res.json(error);
}
}

//search by actorname 
exports.searchmoviesbyactor=async function(req,res){
    console.log(req.params.actorname)
    try {
        const result = await databasecalls.moviesbyactor(req.query.actorname,req.query.sortorder);
        res.json(result.recordsets);
    } catch (error) {
        res.json(error);
    }
}

exports.movieclicked=async function(req,res){
    console.log(req.params.imdbID)
    console.log(req.username)
    try {
        const result = await databasecalls.getSingleMovie(req.params.imdbID,req.username)
        res.json({result:result.recordsets[0]});
    } catch (error) {
        res.send(error)
    }
}
