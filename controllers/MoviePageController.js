const databasecalls = require('../funcsusedbycontrollers/USERdatabasecalls.js');


exports.getmoviepages=async function(req,res){
     //moviepagination with sorting parameters
    if (req.query.genre=='') {
        req.query.genre=null
    } 
    const totalrecords = await databasecalls.gettotalrecords(req.query.genre)
    console.log(totalrecords)
    const sortparam = req.query.sortby
    console.log(sortparam)
    try {
       if(sortparam=='movieName'){
        const result = await databasecalls.getmoviepages(req.query.moviepage||1,24,sortparam,req.query.genre) 

        res.json({
            pagenumber: req.query.moviepage,
            totalrecords: totalrecords,
            result: result.recordsets[0]}
            );
           
        
    }else if(sortparam=='movieDirector'){
        const result = await databasecalls.getmoviepages(req.query.moviepage||1,24,sortparam,req.query.genre)
        res.json({
            pagenumber: req.query.moviepage,
            totalrecords: totalrecords,
            result: result.recordsets[0]});
    }else if(sortparam=='releaseDate'){
        const result = await databasecalls.getmoviepages(req.query.moviepage||1,24,sortparam,req.query.genre)
        res.json({
            pagenumber: req.query.moviepage,
            totalrecords: totalrecords,
            result: result.recordsets[0]});
    }
    else{
        const result = await databasecalls.getmoviepages(req.query.moviepage||1,24,'movieID',req.query.genre) //get movie pages depending on the number of entries in the DB and sort
 
        res.json({
            pagenumber: req.query.moviepage,
            totalrecords: totalrecords,
            result: result.recordsets[0]});
    }
    } catch (error) {
        res.json(error)
    }
}

exports.requestmovie = async function(req, res) {
    try {
        if (!req.body.moviename || !req.body.moviedirector || !req.body.overview || !req.body.genre || !req.body.releaseDate) {
            res.json("Please fill all required fields");
            return;
        }
        
        const result = await databasecalls.requestmovie(req.body.moviename, req.body.moviedirector, req.body.overview, req.body.genre, req.body.releaseDate);
        console.log(result);
        
        if (result.recordset[0].requested == 0) {
            res.json("Movie request sent");
        } else if (result.recordset[0].requested == 1) {
            res.json("Movie already requested and will be added soon"); 
        } else {
            res.json("Movie already exists in database");
        }
    } catch (error) {
        console.error(error);
        res.json("Error requesting movie");
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




