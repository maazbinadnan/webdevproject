const express=require('express');
const router = require('./routers/userRouter');
const router2 = require('./routers/loginregrouter');
const app=express();
const Bodyparser = require('body-parser');
app.use(Bodyparser.urlencoded({extended:false}));
app.use(express.json()); // parse json datas
app.use('/user',router);// basucally if you go to /api it will go to router.js
app.use('/database', router2); //basically if you go to /database it will go to routerforDB.js
const port =3000
app.listen(port,()=>console.log(`Server started on port ${port}`));

 
