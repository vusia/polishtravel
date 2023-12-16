import { useState, useSelector, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import { useLocalStorage } from "@uidotdev/usehooks";

import Header from '../components/Header'
import Footer from '../components/Footer'
import CommentForm from '../components/CommentForm'
import handleAddPost from '../components/PostForm'
import HomePage from '../pages/HomePage'
import ShowPost from '../pages/PostPage'
import LoginForm from '../pages/LoginPage'
//import RegisterPage from '../pages/RegisterPage'
import AdminPage from '../pages/AdminPage'
import Profil from '../pages/ProfilPage'


import RegistrationForm from '../pages/RegisterPageSecure'


function App() {

  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn',false);
  const [isAdmin, setIsAdmin] = useLocalStorage('isAdmin',false);
 
  return (
  
       <Router>
       
            <Header />
            <Routes>
                <Route path="/" element={ <HomePage /> } />
                <Route path="/posts/:post_id" element={ <ShowPost /> } />
                <Route path="/posts/:post_id/add_comment" element={ <CommentForm /> } />             
                <Route path="/login" element={ <LoginForm /> } />
                <Route path="/admin" element={ isAdmin ? <AdminPage /> : <Navigate replace to={"/"} />} />
                <Route path="/register" element={ <RegistrationForm /> } />
                <Route path="/profil" element={ <Profil /> } />
                <Route path="/posts/add" element={ <handleAddPost /> } />
                
            </Routes>
            <Footer />
        </Router>
    
  )
}

export default App
