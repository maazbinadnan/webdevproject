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

//change password and email
homerouter.get("/home" ,HPcontroller.showHpdetails); 
homerouter.patch("/changepassword",HPcontroller.changepassword);
homerouter.patch("/changeemail",HPcontroller.changeemail);

//getting all movie pages
homerouter.get("/movies",MovieController.getmoviepages)
homerouter.post("/requestmovie",MovieController.requestmovie)
homerouter.post("/addreview",MovieController.addreview)

//movie searches
homerouter.get("/moviesearch/name",MovieSearchController.searchmoviesbyname);
homerouter.get("/moviesearch/director",MovieSearchController.searchmoviebydirector)
homerouter.get("/moviesearch/genre",MovieSearchController.searchmoviesbygenre)
homerouter.get("/moviesearch/year",MovieSearchController.searchmoviesbyyear)
homerouter.get("/moviesearch/actor",MovieSearchController.searchmoviesbyactor)
//wiki
homerouter.post("/addwiki",UserwikiController.insertdataintowiki)
homerouter.get("/wikis",UserwikiController.displayallwikis)
homerouter.get("/searchwiki",UserwikiController.searchforatopic)

module.exports=homerouter