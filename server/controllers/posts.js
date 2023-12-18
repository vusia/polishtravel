const db = require('../models/database.js')


async function list (req, res) {

        let [post] = await db.query(`
            SELECT *
            FROM posts
        `)
        

res.json(post)
}



module.exports.list = list