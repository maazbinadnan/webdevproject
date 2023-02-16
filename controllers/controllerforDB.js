const getPool = require('../databases/databaseconfig.js');
const bcrypt = require('bcrypt'); 
const emailregex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// exports.alldata = (req, res) => {
//     try {
        
//         getPool().connect().then(() => {
//         res.send("hello connected to pool");    
//         })
//     } catch (error) {
//         console.log(error);
//         res.send("cannot connect to pool");
//     }
// }

// exports.viewall = async (req, res) => {
//     try {
//         getPool().connect().then(() => {
//         const request = getPool().request();
//         request.query('select * from nodetable', (err, result) => {
//         console.log(result);
//         res.send(result);
//         })
//     })
//     } catch (error) {
//         console.log(error);
//         res.send("cannot connect to pool");
//     }
// }

// exports.paramquery = (req, res) => {
//     try {
//         const id = req.params.id;
        
//         getPool().connect().then(() => {
//         const request = getPool().request();
//         request.query(`select * from nodetable where id = ${id}`, (err, result) => {
//         console.log(result);
//         res.send(result.recordset);
//         })
//     })
//     } catch (error) {
//         console.log(error);
//         res.send("cannot connect to pool");
//     }
// }
// exports.insert = (req, res) => {
//     try {
       
//         getPool().connect().then(async () => {
//         const request = getPool().request();
//         const {id, name , phone} = req.body;
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);
//         console.log(hashedPassword);
//         request.query(`insert into nodetable values (${id}, '${name}', '${phone}','${hashedPassword}')`, (err, result) => {
//          if (result) {
//             console.log(result);
//             res.send("inserted values in database");    
//          }else{
//             console.log(err);
//             res.send("cannot insert values in database");   
//          }       
//         })
        
//         })
//     } catch (error) {
//         console.log(error);
//         res.send("cannot connect to pool");
//         }
// }
// exports.login= (req, res) => {
//     const {id, name} = req.body;
//     try {
//         getPool().connect().then(async () => {
//         getPool().request().query(`select * from nodetable where id = ${id}`, (err, result) => { //check is username exists
//             if (result) {
//                 const user = result.recordset[0];
//                 console.log(user);
//                 res.redirect('/database/viewall')
//             } else {
//                 console.log(err);
//             }
//         })
//         })
//     } catch (error) {
        
//     }
        
// }

exports.registeruser = async (req, res) => {
    let result;
    try {
const {username,email,password}= req.body;
const hashedPassword = await bcrypt.hash(req.body.password, 10);
getPool().connect().then(async () => {
    result = await getPool().request().query(`select Count(*) as count from users where username = '${username}'`);
    if (result.recordset[0].count>0) {
        res.send("username already exists");
        
    }else{
        
    }
})


if (emailregex.test(email)) {
    res.send("email is valid");
}else {
    res.send("email is not valid");
}
    
} 
catch (error) {
    console.log(error);
}
}
    



