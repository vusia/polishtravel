import React, { useState } from 'react';
import zxcvbn from 'zxcvbn';
import { useNavigate } from 'react-router-dom';

export default function RegistrationForm() {
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    // to check if the password is strong
    const result = zxcvbn(newPassword);
    setPasswordStrength(result.score);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // to check if the password is enought strong
    if (passwordStrength < 3) {
      alert('Le mot de passe est trop faiblé. Un mot de passe plus fort est requis.');
      return;
    }

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
      //useNavigate('/login');
    })
    .catch(error => {
      console.error('Error:', error);
    });
    setUsername('');
    setEmail('');
    setPassword('')
  };
  

  return (
      
      
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
        <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <div><button type="submit" className="btn">Register</button></div>
        {/* show the info about password who depends about zxcvbn result */}
      {password && (
        <div>
          <p>Fiabilité du mot de passe : {passwordStrength}/4</p>
          <p>{zxcvbn(password).feedback.suggestions.join(' ')}</p>
        </div>
      )}
    </form>
    
    </main>
    
  );
};


