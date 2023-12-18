const db = require('../models/database.js')



async function admin (req, res) {
    
    let [users] = await db.query(`   
        SELECT *
        FROM users
        ORDER BY username ASC
        `)

console.log(users)
res.json(users)
}



module.exports.admin = admin



