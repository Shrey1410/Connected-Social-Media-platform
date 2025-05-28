import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter} from "react-router";
import './index.css'
import UserProvider from './context/UserContext.jsx'
import SocketProvider from './context/SocketContext.jsx';
createRoot(document.getElementById('root')).render(
  <UserProvider>
  <SocketProvider>
     <BrowserRouter>
        <StrictMode>
          <App />
        </StrictMode>
      </BrowserRouter>
  </SocketProvider>
  </UserProvider>
)
