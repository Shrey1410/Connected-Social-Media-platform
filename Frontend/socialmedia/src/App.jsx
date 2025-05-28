import React from 'react'
import { Routes, Route } from "react-router";
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register';
import Profile from './pages/Profile';
import FriendProfile from './pages/FriendProfile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Register/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/userprofile" element={<FriendProfile/>}></Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App