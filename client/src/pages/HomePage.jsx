import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import ShowPost from '../pages/PostPage'



function HomePage() {
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
  

  return (
    <main>
    {posts.map(post => (
        <section className="post fade-in-element" key={post.post_id}>
            {<img src={post.photo} alt={post.title} />}
          <div>
          <h2>{post.title}</h2>
          <p>{truncateText(post.content, 250)}...</p>
          <span>{formatDate(post.post_date)}</span>
          <p><Link to={`/posts/${ post.post_id }`}><button className="btn">Voir tout</button></Link></p>
          </div>
        </section>
      ))}
    </main>
  );
}

export default HomePage;



