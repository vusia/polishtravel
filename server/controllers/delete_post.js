const db = require('../models/database.js')


 async function delete_post (req, res) {
      const postId = req.params.post_id
    
    let [fields] = await db.query(`
        DELETE 
        FROM posts
        WHERE post_id = ?
    `, [postId])

    return res.status(200).json({});
 }
 
 
module.exports.delete_post = delete_post