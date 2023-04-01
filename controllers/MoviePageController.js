const databasecalls = require('../funcsusedbycontrollers/USERdatabasecalls.js');


exports.getmoviepages=async function(req,res){ //moviepagination with sorting parameters
    const totalrecords = await databasecalls.gettotalrecords()
    console.log(totalrecords)
    const sortparam = req.query.sortby
    try {
       if(sortparam=='movieName'){
        const result = await databasecalls.getmoviepages(req.query.moviepage||1,10,sortparam) 
        res.json({
            pagenumber: req.euery.moviepage,
            totalrecords: totalrecords,
            result: result.recordsets});
        
    }else if(sortparam=='movieDirector'){
        const result = await databasecalls.getmoviepages(req.query.moviepage||1,10,sortparam)
        res.json({
            pagenumber: req.query.moviepage,
            totalrecords: totalrecords,
            result: result.recordsets});
    }
    else{
        const result = await databasecalls.getmoviepages(req.query.moviepage||1,10,'movieID') //get movie pages depending on the number of entries in the DB and sort
 
        res.json({
            pagenumber: req.query.moviepage,
            totalrecords: totalrecords,
            result: result.recordsets});
    }
    } catch (error) {
        res.json(error)
    }
}

exports.requestmovie=async function(req,res){
    try {
        const result = await databasecalls.requestmovie(req.body.moviename,req.body.moviedirector,req.body.overview,req.body.genre,req.body.releaseDate);
       
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




