const express = require("express")
const bcrypt = require('bcrypt')
const db = require('../models/database.js')
const nodemailer = require("nodemailer");
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const postController = require('../controllers/posts.js')
const show_postController = require('../controllers/show_post.js')
const delete_postController = require('../controllers/delete_post.js')
const adminController = require('../controllers/admin.js')
const new_postController = require('../controllers/add_post.js')
const user_commentController = require('../controllers/user_comments.js')
const commentController = require('../controllers/commentController.js')


const router = express.Router()
console.log(user_commentController)

router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

/////////////////////////////////////////////////////////////////////////////////////
// new comment endpoint



router.post('/api/comments/add', (req, res) => {
  console.log(req.body);
  const komentarz = {
    post_id: req.body.post_id,
    commenter_name: req.body.commenter_name,
    comment: req.body.comment,
    comment_date: new Date().toISOString(),
    user_id: req.body.user_id,
  };

  commentController.dodajKomentarzDoBazy(komentarz);
  res.status(201).json({ message: 'New comment added.', komentarz });
  console.log('New comment added');
});

//////////////////////////////////////////////////////////////////////
// new post endpoint

router.post('/api/posts/add', (req, res) => {
  const newPost = {
    post_id: req.body.post_id,
    title: req.body.title,
    content: req.body.content,
    photo: req.body.photo,
    post_date: new Date().toISOString()
  };

  new_postController.add_post(newPost);
  res.send('New post added');
  console.log('New post added');
});

////////////////////////////////////////////////////////////////////////
//  registration endpoint

router.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);

    const [existingUser] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'This username already exist' });
  }

    // Hashing the password
    console.log('Before hashing:', password);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('After hashing:', hashedPassword);

    await db.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [
      username,
      email,
      hashedPassword,
    ]);

    res.status(201).json({ message: 'New user registred.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

//////////////////////////////////////////////////////////////////////////////////////////
// login endpoint


router.post('/api/login', async (req, res) => {
  try {
    const { username, password, isAdmin } = req.body;
    const [existingUser] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    if (existingUser.length === 0) {
      return res.status(401).json({ message: 'Invalid login credentials.' });
    }
    const hashedPasswordFromDatabase = existingUser[0].password;
    const userId = existingUser[0].user_id;
    const userIsAdmin = existingUser[0].isAdmin
    const userRegisterDate = existingUser[0].register_date
    const userEmail = existingUser[0].email
    const isValidPassword = await bcrypt.compare(password, hashedPasswordFromDatabase);
    if (isValidPassword) {
      return res.json({
      id: userId,
      username: username,
      isAdmin: userIsAdmin,
      register_date: userRegisterDate, 
      email: userEmail,
    });
    
    
   
    } else {
      return res.status(401).json({ message: 'Invalid login credentials.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
 
});

///////////////////////////////////////////////////////////////////////////


// middleware to test if authenticated
{/*function isAuthenticated (req, res, next) {
  if (req.session.userLoggedIn) {
    next()
  } else {
    res.status(401).json({ message: 'Brak dostępu. Użytkownik nie jest zalogowany.' });
  }}*/}
  
  
router.get('/api', postController.list)
router.get('/api/posts/:post_id', show_postController.show_post)
router.delete('/api/posts/delete/:post_id', delete_postController.delete_post)
router.get('/api/admin', adminController.admin)
router.get('/api/usercomments/:username', user_commentController.user_comment)


module.exports.router = router