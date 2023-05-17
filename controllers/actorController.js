const databasecalls = require('../funcsusedbycontrollers/USERdatabasecalls.js');

exports.actornamesearch = async function (req, res) {
    let actorname = req.query.actorname;
    const result = await databasecalls.searchactorname(actorname);
    if (result) {
        res.json({ result: result.recordsets[0] });
    } else {
        res.json({ message: 'no such actor exists' })
    }
}
exports.actorpagination = async function (req, res) {
    try {
        let pagesize = 24
        let page = req.query.pagenumber
        const totalrecords = await databasecalls.getTotalactors()
        const result = await databasecalls.actorpagination(pagesize, page)
        if (result) {
            res.json({
                pagenumber: page,
                totalrecords: totalrecords.recordsets[0],
                result: result.recordsets[0]
            })
        } else {
            res.send('some error occured')
        }
    } catch (error) {
        res.status(400).send(error)
    }
}
exports.getSingleactor = async function (req, res) {
    try {
        const result = await databasecalls.getsingleactor(req.params.imdbID)
        if (result) {
            res.json({ result: result.recordsets[0] })
        } else {
            res.json({ message: 'no such actor exists' })
        }
    } catch (error) {
        res.status(400).send(error)
    }

}
