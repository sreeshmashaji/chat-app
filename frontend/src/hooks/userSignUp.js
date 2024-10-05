import React, { useState } from 'react'
import toast, { ErrorIcon } from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

function userSignUp() {
    const {setAuthUser}=useAuthContext()
  const[loading,setLoading]=useState(false)
  const signup=async({fullName,username,password,confirmPassword,gender})=>{
    const success=handleInputErrors({fullName,username,password,confirmPassword,gender})
    if (!success) return;

    setLoading(true)

    try {
        
        const res=await fetch("/api/auth/signup",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({fullName,username,password,confirmPassword,gender})

        
        })
        const data=await res.json()
        if (data.error){
            throw new Error(data.error)
        }
        console.log(data)

        localStorage.setItem("chat-user",JSON.stringify(data))
        setAuthUser(data)

    } catch (error) {
        toast.error(error.message)
        
    }
    finally{
        setLoading(false)

    }
   

  }

  return {loading ,signup}
}

export default userSignUp


function handleInputErrors({fullName,username,password,confirmPassword,gender}){
    if (!fullName || !username || !password || !confirmPassword || ! gender){
        toast.error("Please fill all the required fields ❗❗")
        return false 
    }
    if (password != confirmPassword){
        toast.error("Password dont match")
        return false
    }

    if (password.length<6){
        toast.error("Password length must be atleast 6 characters")
        return false
    }
    return true
}