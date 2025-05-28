import React from "react"
import { createContext , useState, useEffect } from "react"
export const UserDataContext = createContext()
import axios from "axios"
import { useNavigate } from "react-router-dom"
const UserProvider = ({children})=>{
    const [user, setUser] = useState(null)
    useEffect(()=>{
        const checkifUser = async ()=>{
          try{
            const res = await axios.get('http://localhost:8000/user',{
              withCredentials: true,
            })
            if(res.data.user){
              setUser(res.data.user)
            }
          }
          catch(err){
            console.log(err)
            setUser(null)
          }
        }
        checkifUser()
      }, []) 
    return(
        <UserDataContext.Provider value={{ user, setUser }}>
            {children}
        </UserDataContext.Provider>
    )
}
export default UserProvider