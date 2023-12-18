const db = require('../models/database.js')


const dodajKomentarzDoBazy = (komentarz) => {
  if (!db) {
    console.error('No connection with the base');
    return;
  }
  const { post_id, commenter_name, comment, user_id } = komentarz;

  const queryString = 'INSERT INTO comments (post_id, commenter_name, comment, user_id) VALUES (?, ?, ?, ?)';
  const values = [post_id, commenter_name, comment, user_id];

  db.query(queryString, values, (err, results) => {
    if (err) {
      console.error('Error:', err);
      return;
    }
    console.log('Comment is added', komentarz);
  });
};

module.exports = {
  
  dodajKomentarzDoBazy
};



