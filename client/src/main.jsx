import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './app/App.jsx'

import '../public/css/style.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <App />
  </React.StrictMode>,
)