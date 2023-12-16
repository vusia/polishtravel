import React, { useState, useEffect } from 'react';
import RegisterPage from './RegisterPage'
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useLocalStorage } from "@uidotdev/usehooks";


const LoginForm = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn',false);
  const [isAdmin, setIsAdmin] = useLocalStorage('isAdmin', false);
  const [username,setUsername] = useLocalStorage('username', null)
  const [register_date,setRegisterDate] = useLocalStorage('register_date', null)
  const [email,setEmail] = useLocalStorage('email', null)
  const [userId,setUserId] = useLocalStorage('user_id', null)
  
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  

  const handleLogin = async (e) => {
    
    try {
      e.preventDefault();
      const response = await fetch('http://ewaglazewska.ide.3wa.io:3001/api/login', { 
      method: 'POST',
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user,
        password: password,
        //isAdmin: isAdmin,
        register_date: register_date,
        email: email,
      }),
      });
     if (response.ok) {
      const data = await response.json();
      setIsLoggedIn(true);
      setUsername(data.username);
      setRegisterDate(data.register_date);
      setEmail(data.email);
      console.log('User data:', data);
      
      if (data.isAdmin === 1) {
        setIsAdmin(true);
        console.log('User is admin.');
      }
      setMessage('Logged in');
      alert('Logged in');
    } else {
      const errorMessage = await response.text();
      setMessage(errorMessage);
      alert('Login failed');
    }
  } catch (error) {
    console.error(error);
    setMessage('Error');
  }
     
  };
  
  
  return (
    
    <main>
    
     {isLoggedIn ? (
          <Navigate to='/' />
        ) : (
      <div className="form-container">
      <form>
      <h2>Connection</h2>
        <label>Nom:
        <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
        </label>
      
        <label>Mot de pass:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
      
        <div><button onClick={handleLogin} className="btn">Connecter</button></div>
       </form>
       
      <p>{message}</p>
      
      
      <div className="register">
      <h2>Vous n'avez pas d'account ? </h2>
      <h3>Registrez vous :</h3>
      <Link to={ '/register' }><button className="btn">Register</button></Link>
      </div>
      </div>
    )}
    </main>
  );
};


export default LoginForm;





