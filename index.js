const express=require('express');
const cors = require('cors')
const loginrouter = require('./routers/loginuserrouter');
const registerrouter = require('./routers/registerrouter');
const homerouter = require('./routers/userHomerouter');
const loginadminrouter = require('./routers/loginadminrouter')
const adminactionrouter=require('./routers/adminrouter')

const app=express();
app.use(cors())
const Bodyparser = require('body-parser');
app.use(Bodyparser.urlencoded({extended:false}));
app.use(express.json()); // parse json datas
app.use('/loginuser', loginrouter); 
app.use('/registeruser', registerrouter);
app.use('/loginadmin',loginadminrouter); 
app.use('/user',homerouter);

app.use('/admin',adminactionrouter);
const port =5000
app.listen(port,()=>console.log(`Server started on port ${port}`));

 
