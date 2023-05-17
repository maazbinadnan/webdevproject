const wikistoapprove = require('../databases/mongowikischema');
const adminwiki = require('../databases/adminwikischema');
const mongoose = require('mongoose');


async function getconnection(){
try {
    console.log("hi")
    const mongoconnection= await mongoose.connect(`mongodb+srv://${process.env.mongousername}:${process.env.mongopassword}@cluster0.ki1sv6q.mongodb.net/CinephileCollective?retryWrites=true&w=majority`)
    if(mongoose.connection.readyState === 1) {
        console.log('Database connected successfully.');
      } else {
        console.log('Database connection failed.');
      }
    return mongoconnection;    
    } catch (error) {
        console.log(error);
        return error;
    }

}
exports.insertdataintowiki = async function(req,res){
    console.log(req.username)
    console.log(req.email)
    getconnection();
    const wiki = new wikistoapprove({
        username: req.username,
        email: req.email,
        title: req.body.title,
        content: req.body.content,
        date: Date.now()
    })
    try {
        const result = await wiki.save();
        if(result){
            res.send("data is waiting for approval")
    }
    }catch(error){
        res.send(error)
    }
}

exports.displayallwikis=async function(req,res){
    
    getconnection();
    const result = await adminwiki.find();
    res.send(result);
}
// exports.displayallwikis= async function(req,res){
// console.log("hi")
// }

exports.searchforatopic=async function(req,res){
   
    getconnection();
    const regex = new RegExp(req.query.title, "i");
     
    try{
        const results = await adminwiki.find({ title: { $regex: regex } }); //search for a wiki topic
        res.send(results);
    }catch(error){
        res.send("no results found");
    }
}