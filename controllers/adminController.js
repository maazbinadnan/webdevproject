const adminDBcalls = require('../funcsusedbycontrollers/adminDBcalls')
const wikistoapprove = require('../databases/mongowikischema');
const adminwiki = require('../databases/adminwikischema');
const mongoose = require('mongoose');
const wikis = require('../databases/mongowikischema');


async function getconnection() {
    try {
        const mongoconnection = await mongoose.connect(process.env.mongoadminuri)
        if (mongoose.connection.readyState === 1) {
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

exports.getallwikistoapprove = async function (req, res) {
    getconnection();
    const result = await wikistoapprove.find();
    res.json(result)
}

exports.getallwikis = async function (req, res) {
    getconnection();
    const result = await adminwiki.find();
    res.json(result)
}

exports.postwiki = async function (req, res) {
    getconnection();
    try {
        const result = await wikistoapprove.findOne({ title: req.body.title, username: req.body.username });
        console.log(result)
        if (result) {
            const wiki = new adminwiki({
                username: result.username,
                email: result.email,
                title: result.title,
                content: result.content,
                date: result.date
            })
            await wiki.save();
            await wikistoapprove.deleteOne({ title: req.body.title })

        }
        res.json("wiki posted")
    } catch (error) {
        res.json(error)
    }
}
exports.deletewiki = async function (req, res) {
    //write code to delete wiki
    getconnection();
    try {
        await adminwiki.deleteOne({ _id: req.params._id })
        res.json({

            message: "wiki deleted"

        })

    } catch (error) {
        res.json(error)
    }
}

exports.insertactor = async function (req, res) {
    console.log(req.body)
    try {
        const result = await adminDBcalls.Insertactor(req.body.actorname, req.body.DOB, req.body.nationality, req.body.gender, req.body.photo, req.body.imdbid);
        if (result == 1) {
            res.json('actor exists')
        } else {
            res.json('actor added')
        }
    } catch (error) {
        res.json(error);
    }
}

exports.insertmovie = async function (req, res) {
    console.log(req.body)
    try {
        const result = await adminDBcalls.insertmovie(req.body.moviename, req.body.moviedirector, req.body.releasedate, req.body.genre, req.body.overview, req.body.imdbid, req.body.photo);
        console.log(result);
        if (result == 1) {
            res.json('movie added')
        } else {
            res.json('movie exists')
        }
    } catch (error) {
        console.log(error);
    }

}

exports.insertmovie_actor = async function (req, res) {
    console.log(req.body)
    let message1 = '';
    let message2 = '';
    let message3 = '';
    try {
        await adminDBcalls.insertmovie(req.body.moviename, req.body.moviedirector, req.body.releasedate, req.body.genre, req.body.overview, req.body.movieIMDBid, req.body.photo);
        const result = await adminDBcalls.checkActorExist(req.body.actorIMDBid1, req.body.actor1)
        console.log(result)

        if (result == 0) {

            res.send(`Actor ${req.body.actor1} does not exist in the database,please enter his details`)
        }
        else if (result == 1) {
            await adminDBcalls.actormoviejunction(req.body.movieIMDBid, req.body.actorIMDBid1);
            res.json('movie added to database')
        }
    } catch (error) {
        res.json(error);
    }
}

exports.deleteuser = async function (req, res) {
    console.log(req.params.username)
    try {
        const result = await adminDBcalls.deleteUser(req.params.username);
        res.json(result)
    } catch (error) {
        res.json(error);
    }
}
exports.movierequests = async function (req, res) {
    try {
        const result = await adminDBcalls.movierequests();
        res.json(result)
    } catch (error) {
        console.log(error);
    }
}