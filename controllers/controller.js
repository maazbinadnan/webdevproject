const sql = require('mssql');
const express = require('express');


exports.hello = (req, res) => {
    res.send('Hello World!');
}
  
exports.maaz=   (req, res) => {
    res.send("hi my name is maaz");
    }

exports.ali=   (req, res) => {  
    res.send('Hello World ali hey');
}

// exports.userid=   (req, res) => { // make a query to the database and send the result
// try {
//     const result = database.query(`select * from nodecheck`);
//     console.log(result);
// } catch (error) {
//     res.send(error);
// }
// }