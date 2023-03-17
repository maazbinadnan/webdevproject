const databasecalls = require('../funcsusedbycontrollers/databasecalls.js');
//searching for movies 
exports.searchmoviebydirector=async function(req,res){ //director
    console.log(req.params.directorname)
    try {
        const result = await databasecalls.moviesbyDirector(req.params.directorname,req.query.sortorder);
        console.log(result)
        res.json(result.recordsets);    
    } catch (error) {
        res.json(error);    
    }
    
}

exports.searchmovies=async function(req,res){ //name
    try {
        const result = await databasecalls.searchmovies(req.params.moviename,req.query.sortorder);
        res.json(result.recordsets);    
    } catch (error) {
        res.json(error);    
    }
    
}
//searchmoviesbyyear
exports.searchmoviesbyyear=async function(req,res){ //year
    console.log(req.params.year)
    try {
        const result = await databasecalls.moviesbyReleaseYear(req.params.year,req.query.sortorder);
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
        const result = await databasecalls.moviesbyGenre(req.params.genre,req.query.sortorder);
        res.json(result.recordsets);    
    } catch (error) {
        res.json(error);    
    }
    
}
