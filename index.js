const express=require('express');
const router = require('./routers/userRouter');
const loginrouter = require('./routers/loginregrouter');
const registerrouter = require('./routers/registerrouter');
const app=express();
const Bodyparser = require('body-parser');
app.use(Bodyparser.urlencoded({extended:false}));
app.use(express.json()); // parse json datas
app.use('/user',router);// basucally if you go to /alishaikh/home it will go to userrouter.js
app.use('/loginuser', loginrouter); //basically if you go to /database it will go to routerforDB.js
app.use('/registeruser', registerrouter); //basically if you go to /database it will go to routerforDB.js
const port =3000
app.listen(port,()=>console.log(`Server started on port ${port}`));

 
