const databasecalls = require('../funcsusedbycontrollers/databasecalls.js');

exports.searchmovies=async function(req,res){
    try {
        const result = await databasecalls.searchmovies(req.body.moviename);
        res.json(result.recordsets);    
    } catch (error) {
        res.json(error);    
    }
    
}