import { useLocalStorage } from "@uidotdev/usehooks";
import React, { useState, useEffect } from 'react';


export default function Profil() {
    
     const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn',false);
     const [isAdmin, setIsAdmin] = useLocalStorage('isAdmin', false);
     const [username, setUsername] = useLocalStorage('username', null)
     const [register_date,setRegisterDate] = useLocalStorage('register_date', null)
     const [email,setEmail] = useLocalStorage('email', null)
     const commenter_name = username
     const [comments, setComment] = useState([])
     
     
     const formatDate = (dbDate) => {
     const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
     return new Date(dbDate).toLocaleDateString('fr-FR', options);
     };
    
    useEffect(() => {
      const fetchUserComments = async (commenter_name) => {
      try {
        const response = await fetch(`http://ewaglazewska.ide.3wa.io:3001/api/usercomments/${commenter_name}`);
        const data = await response.json();
        setComment(data)
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserComments(commenter_name);
  }, []); 
    
    
     
     return (
     <main>
     <div className="profil fade-in-element">
      {isLoggedIn ? (
        <div>
          <h2>Votre Profil</h2>
          <p><strong>Username: </strong>{username}</p>
          <p><strong>Date de registration: </strong>{formatDate(register_date)}</p>
          <p><strong>Email: </strong>{email}</p>
        {comments.length > 0 && (
          <h4>Votre Commentaires :</h4>
          )}
          <ul>
        {comments.map((comment) => (
          <li key={comment.comment_id}>
            <p><strong>{formatDate(comment.comment_date)} : </strong></p>
            <p>{comment.comment}</p>
          </li>
        ))}
      </ul>
        </div>
      ) : (
        <p>Connectez pour voir votre profil</p>
      )}
    </div>
    </main>
  );
};