const db = require('../models/database.js')

async function show_post (req, res) {
      const postId = req.params;
      const id = postId.post_id
      console.log(postId)
   const [post] = await db.query(`
        SELECT *
        FROM posts
        WHERE post_id = ?
    `, [id])
    
    
    if (post.length == 0) {
        return res.status(404).json({
            'error': 'No entity for this id'
        })
    }
    
   let [comments] = await db.query(`
        SELECT * 
        FROM comments
        WHERE post_id = ?
    `, [id])
    
    console.log(post)
    console.log(comments)
    res.json({...post[0], comments: comments})

 }
 
module.exports.show_post = show_post





