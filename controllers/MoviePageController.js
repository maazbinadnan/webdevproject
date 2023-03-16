const databasecalls = require('../funcsusedbycontrollers/databasecalls.js');

exports.searchmovies=async function(req,res){
    try {
        const result = await databasecalls.searchmovies(req.body.moviename);
        res.json(result.recordsets);    
    } catch (error) {
        res.json(error);    
    }
    
}

exports.getmoviepages=async function(req,res){
    try {
        const result = await databasecalls.getmoviepages(req.query.moviepage||1,10)
        res.json(result.recordsets);
    } catch (error) {
        res.json(error)
    }
}

exports.requestmovie=async function(req,res){
    try {
        const result = await databasecalls.requestmovie(req.body.moviename,req.body.moviedirector);
       
        if(result.recordset[0].requested==0){
            
            res.json("Movie request sent");
        }else if(result.recordset[0].requested==1){
            res.json("Movie already requested and will be added soon");
        }else{
            res.json("Movie already exists in database");
        }
    } catch (error) {
        res.json(error)
    }
}
exports.addreview= async function(req,res){
    try {
        const result = await databasecalls.addreview(req.username,req.query.movieID,req.body.rating,req.body.comments);
            if (result.rowsAffected[0]==1) {
            res.json({
                message: "Review added successfully"
            })
        } else {
            res.json({
                message: "Review not added"
            })
        }
    } catch (error) {
        res.json(error);
    }
}