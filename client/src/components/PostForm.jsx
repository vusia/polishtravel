import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';




const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', photo: '' });

  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://ewaglazewska.ide.3wa.io:3001/api');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Błąd podczas pobierania postów:', error);
      }
    };
    fetchData();
  }, []); 

  const handleAddPost = async () => {
    try {
      const response = await fetch('http://ewaglazewska.ide.3wa.io:3001/api/posts/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        const updatedPosts = [...posts, newPost];
        setPosts(updatedPosts);
        alert('Nouveau poste à été ajouté !');
        navigate(0);
      } else {
        console.error('Error');
      }
    } catch (error) {
      console.error('Error of sending:', error);
    }
  };

  return (
    
      <form className="form">
      <h2>Ajouter le poste</h2>
        <label htmlFor="title">Titre :</label>
        <input
          type="text"
          id="title"
          value={newPost.title}
          onChange={(e) => setNewPost((prevPost) => ({ ...prevPost, title: e.target.value }))}
        />

        <label htmlFor="content">Content :</label>
        <textarea
          id="content"
          value={newPost.content}
          onChange={(e) => setNewPost((prevPost) => ({ ...prevPost, content: e.target.value }))}
        />

        <label htmlFor="photo">Image :</label>
        <input
          type="text"
          id="photo"
          value={newPost.photo}
          onChange={(e) => setNewPost((prevPost) => ({ ...prevPost, photo: e.target.value }))}
        />

        <button type="button" className="btn" onClick={handleAddPost}>Ajouter le poste</button>
      </form>
    
  );
};
export default PostList;
