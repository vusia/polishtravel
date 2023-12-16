import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://ewaglazewska.ide.3wa.io:3001/api/register', {
      method: 'POST',
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert('Vous etes registré ! Connecter-vous');
      navigate('/login');
    })
    .catch(error => {
      console.error('Error:', error);
    });
    setUsername('');
    setEmail('');
    setPassword('')
  };
    return(
        
      <main> 
      
      <form onSubmit={handleSubmit} className="form-container">
      <h2>Registration</h2>
        <label>Votre nom :
        <input type="text" id="username" name="username" required value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nom"/>
        </label>
        <label >Votre e-mail:
        <input type="text" id="email" name="email" required value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"/>
        </label>
        <label>Mot de pass:
        <input type="password" id="password" name="password" required value={password}
            onChange={(e) => setPassword(e.target.value)} placeholder="Mot de Pass"/>
        </label>
        <div><button type="submit" className="btn">Register</button></div>
    </form>
    
    </main>
      
      )
}