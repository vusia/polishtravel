import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import PostForm from '../components/PostForm'
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://ewaglazewska.ide.3wa.io:3001/api/admin');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsers();
  }, []); 

const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('http://ewaglazewska.ide.3wa.io:3001/api')
      .then(response => response.json())
      .then(postsData => setPosts(postsData))
      .catch(error => console.error('Błąd podczas pobierania postów:', error));
  }, []);
  
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...'; 
    }
    return text;
  };
  
  const formatDate = (dbDate) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dbDate).toLocaleDateString('fr-FR', options);
  };
  
  const handleDeletePost = async (postId) => {
    try {
      // Wywołanie fetch z metodą DELETE
      const response = await fetch(`http://ewaglazewska.ide.3wa.io:3001/api/posts/delete/${postId}`, {
        method: 'DELETE',
        timeout: 10000,
      });

      if (response.ok) {
        console.log('Poste etait supprimé');
        alert('Poste supprimé !')
        navigate(0)
      } else {
        console.error('Error');
      }
    } catch (error) {
      console.error('Error DELETE:', error);
    }
  };
  
  
  return (
    <main>
    <section className="post">
    <div>
      <h2>Liste d'utilisateurs :</h2>
      <ul>
        {users.map(user => (
          <li key={user.user_id}>
            {user.username} - {user.email} (registré : {formatDate(user.register_date)})
          </li>
        ))}
      </ul>
    </div>
    </section>
    {posts.map(post => (
        <section className="post" key={post.post_id}>
            {<img src={post.photo} />}
          <div>
          <h2>{post.title}</h2>
          <p>{truncateText(post.content, 250)}...</p>
          <span>{formatDate(post.post_date)}</span>
          
         
          <p><Link to={`/posts/${ post.post_id }`}><button className="btn">Voir tout</button></Link></p>
          <p><button onClick={() => { console.log(post.post_id); handleDeletePost(post.post_id); }} className="btn">Supprimer le poste</button></p>
           </div>
        </section>
      ))}
      <section className="post">
      <PostForm />
      </section>
    </main>
  );
};

export default UserList;
