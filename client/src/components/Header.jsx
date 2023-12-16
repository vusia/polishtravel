import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Logo from '../../public/img/1a.png'
import { useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate } from 'react-router-dom';




//import useState from 'react'

export default function Header() {
    
     const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn',false);
     const [isAdmin, setIsAdmin] = useLocalStorage('isAdmin', false);
     const [username, setUsername] = useLocalStorage('username', null)
     
     const navigate = useNavigate();
    
     const handleLogout = () => {
     setIsLoggedIn(false);
     setIsAdmin(false);
     alert('Vous etes déconnecté');
     navigate("/");
     };
   
    return(
    <header>
        
        <img src={Logo} className='logo' alt="Polish Travel" />
        
        
         {isLoggedIn ? (
           <React.Fragment>
           <h2>Hello {username} !</h2>
          <nav>
                      
            <Link to="/">Accueil</Link>
            <button onClick={handleLogout}>Déconnexion</button> 
            <Link to="/profil">Profil</Link> 
          {isAdmin && (
            <Link to="/admin">Administrateur</Link>
            )}
        </nav>
        </React.Fragment>
        
        ) : (
          <nav>
            <Link to="/">Accueil</Link>
            <Link to="/login">Connexion</Link>  
            <Link to="/register">Registration</Link> 
        </nav>
        )}
        
       
        
    </header>
        
    )
}


