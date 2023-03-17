const homerouter = require('express').Router();
const jwt = require('../funcsusedbycontrollers/jwttoken.js');
const HPcontroller = require('../controllers/UserHpController');
const MovieController = require('../controllers/MoviePageController');
const MovieSearchController = require('../controllers/MovieSearchfilter')
const UserwikiController = require('../controllers/UserWikiController')
homerouter.use(async function(req,res,next){ //first middleware to check if the token is valid and username in request matches with the one in token
    try{
    const token = req.headers.authorization.split(" ")[1];
    decodedtoken = await jwt.getpayloadforuser(token);
    console.log(decodedtoken.username); 
    if (decodedtoken.user == 'cinephile') { //check if the token is for cinephile
        if (decodedtoken.username==req.username) {
            req.email=decodedtoken.email
            next();
        } else {
            res.send("username not matching w token");
        } 
    } else {
        res.send("not authorized");
    }}catch(error){
        res.send("no token found");
    }
})

//login and register
homerouter.get("/home" ,HPcontroller.showHpdetails); 
homerouter.post("/changepassword",HPcontroller.changepassword);
homerouter.post("/changeemail",HPcontroller.changeemail);

//getting all movie pages
homerouter.get("/allmovies",MovieController.getmoviepages)
homerouter.post("/requestmovie",MovieController.requestmovie)
homerouter.post("/addreview",MovieController.addreview)

//movie searches
homerouter.post("/moviesearch/name/:moviename",MovieSearchController.searchmovies);
homerouter.post("/moviesearch/director/:directorname",MovieSearchController.searchmoviebydirector)
homerouter.post("/moviesearch/genre/:genre",MovieSearchController.searchmoviesbygenre)
homerouter.post("/moviesearch/year/:year",MovieSearchController.searchmoviesbyyear)

//wiki
homerouter.post("/addwiki",UserwikiController.insertdataintowiki)
homerouter.get("/wikis",UserwikiController.displayallwikis)
homerouter.post("/searchwiki",UserwikiController.searchforatopic)

module.exports=homerouter