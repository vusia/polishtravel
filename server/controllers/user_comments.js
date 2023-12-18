const db = require('../models/database.js')



async function user_comment (req, res) {
  
  const commenter_name = req.params.username; 
  console.log(commenter_name);
  try {
    // Pobierz komentarze dla danego username
    const [userComments] = await db.query(
      'SELECT * FROM comments WHERE commenter_name = ?',
      [commenter_name]
    );
    res.json(userComments); 
    console.log(userComments)
  } catch (error) {
    console.error('Błąd podczas pobierania komentarzy zalogowanego użytkownika:', error);
    res.status(500).json({ message: 'Wystąpił błąd podczas pobierania komentarzy.' });
  }
};

module.exports.user_comment = user_comment