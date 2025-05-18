import React from 'react'
import { Routes, Route } from "react-router";
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register';
import Profile from './pages/Profile';

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Register/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/settings" element={<h1>Settings</h1>} />
      </Routes>
    </>
  )
}

export default App