const db = require('../models/database.js')

/**
 * A function to list all entries for this entity
 */
async function show_comment (req, res) {
    
     let [com] = await db.query(`
        SELECT * FROM comments
    `)
    console.log(com)
    res.json(com)
   
}

module.exports.show_comment = show_comment