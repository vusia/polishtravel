import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import CommentForm from '../components/CommentForm'
import { useLocalStorage } from "@uidotdev/usehooks";


export default function ShowPost() {
  const [selectedPost, setSelectedPost] = useState(null);
  const params = useParams();
  
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn',false);
  //const [username, setUsername] = useLocalStorage('username', null)
  
  const formatDate = (dbDate) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dbDate).toLocaleDateString('fr-FR', options);
  };

  useEffect(() => {
    fetchPost(params.post_id);
  }, []);


  const fetchPost = async (postId) => {
    try {
      const response = await fetch(`http://ewaglazewska.ide.3wa.io:3001/api/posts/${postId}`);
      
      if (response.ok) {
        const data = await response.json();
        setSelectedPost(data); 
      } else {
        console.error('Error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    }
  
  

  return (
    <main>
      {selectedPost && (
        <section className="post post_view fade-in-element">
          {<img src={selectedPost.photo} alt={selectedPost.title} />}
          <h2>{selectedPost.title}</h2>
          <p>{formatDate(selectedPost.post_date)}</p>
          <p>{selectedPost.content}</p>
          {selectedPost.comments && selectedPost.comments.length > 0 && (
          <h3>Commentaires :</h3>
          )}
          {selectedPost.comments.map(comment => (
            <div key={comment.comment_id}>
              <p><strong>{comment.commenter_name}</strong>: {comment.comment}</p>
              <p>{formatDate(comment.comment_date)}</p>
            </div>
            ))}
        {isLoggedIn && (
        <CommentForm postId={selectedPost.post_id} /> 
        )}    
        </section>
      )}
    </main>
  );
}

 



