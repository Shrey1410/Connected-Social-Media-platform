import React from 'react'
import { useContext } from 'react'
import { createContext, useState, useEffect } from 'react'
export const SocketDataContext = createContext()
import io from 'socket.io-client'
const socket = io('http://localhost:8000')
import { UserDataContext } from './UserContext'
const SocketProvider = ({children}) => {
  const { user , setUser } = useContext(UserDataContext)
  useEffect(()=>{
    if(!user) return
    socket.on('userupdated', (data) => {
      setUser(data)
    })
    if(!user.Online) socket.emit('join', {user : user.id})
    socket.on('connect', () => {
      console.log("Connected to server with socket id:", socket.id)
    })
    socket.on('disconnect', (user) => {
      console.log("Disconnected from server with socket id:", socket.id)
    })
  },[user])
  return (
    <div>
      <SocketDataContext.Provider value={{ socket }}>
        {children}
      </SocketDataContext.Provider>
    </div>
  )
}

export default SocketProvider
