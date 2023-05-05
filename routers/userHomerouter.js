const home = require('express')
const homerouter = home.Router();
const jwt = require('../funcsusedbycontrollers/jwttoken.js');
const HPcontroller = require('../controllers/UserHPController');
const MovieController = require('../controllers/MoviePageController');
const MovieSearchController = require('../controllers/MovieSearchfilter')
const UserwikiController = require('../controllers/UserWikiController')

homerouter.use(async function(req,res,next){ //first middleware to check if the token is valid and username in request matches with the one in token
    try{
    const token = req.headers.authorization.split(" ")[1];
    decodedtoken = await jwt.getpayloadforuser(token);
    console.log(decodedtoken.username); 
    if (decodedtoken.user == 'cinephile') { //check if the token is for cinephile
        req.username=decodedtoken.username
        req.email=decodedtoken.email
        next(); 
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
homerouter.get("/moviename",MovieSearchController.searchmoviesbyname);
homerouter.get("/moviedirector",MovieSearchController.searchmoviebydirector)
homerouter.get("/moviegenre",MovieSearchController.searchmoviesbygenre)
homerouter.get("/movieyear",MovieSearchController.searchmoviesbyyear)
homerouter.get("/movieactor",MovieSearchController.searchmoviesbyactor)
homerouter.get("/movie/:moviename",MovieSearchController.movieclicked)

homerouter.get("/wikis", UserwikiController.displayallwikis)
homerouter.post("/addwiki",UserwikiController.insertdataintowiki)

homerouter.get("/searchwiki",UserwikiController.searchforatopic)

module.exports=homerouter