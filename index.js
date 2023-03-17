const express=require('express');
const loginrouter = require('./routers/loginregrouter');
const registerrouter = require('./routers/registerrouter');
const homerouter = require('./routers/userHomerouter');
const app=express();

const Bodyparser = require('body-parser');
app.use(Bodyparser.urlencoded({extended:false}));
app.use(express.json()); // parse json datas
app.use('/loginuser', loginrouter); 
app.use('/registeruser', registerrouter); 
app.use('/:username',function(req,res,next){
    req.username=req.params.username;
    next();
} ,homerouter);
const port =3000
app.listen(port,()=>console.log(`Server started on port ${port}`));

 
