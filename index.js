const express=require('express');
const router = require('./routers/router');
const router2 = require('./routers/routerforDB');
const app=express();
const Bodyparser = require('body-parser');
app.use(Bodyparser.urlencoded({extended:false}));
app.use(express.json()); // parse json datas
app.use('/api',router);// basucally if you go to /api it will go to router.js
app.use('/database', router2); //basically if you go to /database it will go to routerforDB.js
app.listen(3000,()=>console.log(`Server started on port 3000`));


