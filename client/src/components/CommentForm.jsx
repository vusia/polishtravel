import React, { useState } from 'react';
import { useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate } from 'react-router-dom';


const CommentForm = ({ postId }) => {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn',false);
  const [username, setUsername] = useLocalStorage('username', null)
  const [comment, setComment] = useState('');
  const [commenterName, setCommenterName] = useState('');
  const [userId, setUserId] = useLocalStorage('user_id', null);
  
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://ewaglazewska.ide.3wa.io:3001/api/comments/add', {
      method: 'POST',
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post_id: postId,
        commenter_name: username,
        //username: username,
        comment: comment,
        user_id: userId,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
    setComment('');
    //setCommenterName('');
    //navigate(0)
    
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Votre Commentaire" />
      {/*<input type="text" value={commenterName} onChange={(e) => setCommenterName(e.target.value)} placeholder="Votre nom" />*/}
      {/*<input type="text" value={username} onChange={handleInputChange} />*/}
      <button type="submit" className="btn">Ajouter commentaire</button>
    </form>
  );
};

export default CommentForm;
