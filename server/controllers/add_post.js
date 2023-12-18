const db = require('../models/database.js')


const add_post = (newPost) => {
  if (!db) {
    console.error('Brak połączenia z bazą danych');
    return;
  }
  const { title, content, photo } = newPost;
 
  

  const queryString = 'INSERT INTO posts (title, content, photo) VALUES (?, ?, ?)';
  const values = [title, content, photo];

  db.query(queryString, values, (err, results) => {
    if (err) {
      console.error('Error', err);
      return;
    }
    console.log('New post added', newPost);
  });
};

module.exports = {
  
  add_post
};



